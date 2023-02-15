import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeError, MensajeExito, MostrarMensaje, MostrarPayMode } from '../FUNCIONES/mensajes';
import { DIADIFERENCIAHORA, HORA_ACTUAL, HORA_NORMAL } from '../FUNCIONES/moment';
import { HttpService } from '../SERVICIOS/servicios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit{

  productos:any=[];
  suma:any = 0;
  iva:any=0;
  constructor(
    private readonly _router:Router,
    private readonly _http:HttpService
  ){
     
  }
  async ngOnInit() {
    await this.cargarCarrito();
  } 


  irRegreso(){
    localStorage.setItem("sesion","")
    return "inicio";
  }

  cancelarCompra(){
    localStorage.setItem("carrito","");
    this.guardarTiempo();
    MensajeExito("Exito", "Carrito Eliminado");
    this._router.navigate(["tienda"]);
  }

  terminarCompra(){
    localStorage.setItem("carrito","");
    this.guardarTiempo();
    this._router.navigate(["tienda"]);
  }

  guardarTiempo(){
    const inicio:any = localStorage.getItem("tiempoCompra");
    const fin = HORA_NORMAL;
    const diferencia = DIADIFERENCIAHORA(fin,inicio);
    console.log(inicio);
    console.log(fin);
    console.log(diferencia);
    localStorage.setItem("tiempoTransaccion",diferencia);
  }


  async cargarCarrito(){
    const guardado:any = localStorage.getItem("carrito");    
    if(guardado !== "" && guardado !== "[]"){
      this.productos = JSON.parse(guardado);
      this.productos.map((p:any)=>{
        p.cantidad = 1;
      })
    }
      
    else{
      MensajeError("Ups!","No existen productos",await this.obtenerIP())
      this._router.navigate(["tienda"]);
    }
  }


  async obtenerIP(){
    const ip:any = await this._http.obtenerIP(); 
    return  ip
  }


  quitarCarrito(producto:any){
    const aux = [];
    for(let p of this.productos){
      if(p.id !== producto.id){
        aux.push(p)
      }
    }
    this.productos = aux;
    if(this.productos.length === 0){
      this.cancelarCompra();
    }
  }


  async comprar(total:string){
    for(let p of this.productos){
      if(p.cantidad === 0 || p.cantidad === null || p.cantidad === undefined){
        return MensajeError("Error al Comprar","Valores de productos no pueden ser 0", await this.obtenerIP() )
      }
    }

    const respuesta = await MostrarPayMode(total);
    if(respuesta){
      this.terminarCompra();
    }
    

  }

  getPrecio(){
    this.suma = 0;
    for(let p of this.productos){
      let sub = +p.precio * +p.cantidad;      
      this.suma += +sub;
    }
    return this.suma;
  }

  getIVA(total:any){
    this.iva =total * 0.12 
    return this.iva;
  }

  getSubtotal(total:any,iva:any){
    return total - iva;
  }

}
