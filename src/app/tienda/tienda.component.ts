import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensajeError, MensajeExito, MostrarMensaje } from '../FUNCIONES/mensajes';
import { DIADIFERENCIAHORA, HORA_ACTUAL } from '../FUNCIONES/moment';
import { PRODUCTOS } from '../SERVICIOS/productos';
import { HttpService } from '../SERVICIOS/servicios.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent {
  productos:any=[];
  carrito:any=[];
  constructor(
    private readonly _router:Router,
    private readonly _http:HttpService
  ){
 //this.comprobarIngreso();
 this.calcularTiempo();
 this.cargarProductos();
  }



  obtenerTiempoMensaje(mensaje:string){    
    return ""+mensaje+"es = "+localStorage.getItem("tnav") + " segundos";
  }

  calcularTiempo(){
    let res = 0;
    const entrada:any = localStorage.getItem("entrada")?.split(",");
    if(entrada === null || entrada === undefined || entrada === "")
      localStorage.setItem("entrada",HORA_ACTUAL);
    else{
      const salida:any = HORA_ACTUAL.split(",");
      res = DIADIFERENCIAHORA(""+salida,""+entrada);      
      localStorage.setItem("entrada",HORA_ACTUAL);      
    }
    localStorage.setItem("tnav",""+Math.abs(res));
    return Math.abs(res);
  }

  comprobarIngreso(){
    try{
      const sesion = localStorage.getItem("sesion");
      if(sesion === undefined ||sesion === null || sesion === "")
        this._router.navigate(["inicio"]);

    }catch(err){
      this._router.navigate(["inicio"]);
    }
  }
  irRegreso(){
    localStorage.setItem("sesion","")
    return "inicio";
  }


  cargarProductos(){
    this.productos = PRODUCTOS;
  }

  async obtenerIP(){
    const ip:any = await this._http.obtenerIP(); 
    return  ip
  }

  async add(producto:any){
    const existe = this.carrito.find((p:any) => p.nombre === producto.nombre);
    if(existe === undefined){
      this.carrito.push(producto);
      
    MensajeExito("Genial",`${producto.nombre} se a??adio al carrito`)
    }else{
      MensajeError("Ups!","Ya esta en el carrito",await this.obtenerIP())
    }
  }

  irCarrito(){
    localStorage.setItem("carrito",JSON.stringify(this.carrito));
    this._router.navigate(["carrito"]);
  }

}
