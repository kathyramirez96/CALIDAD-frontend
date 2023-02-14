import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DIADIFERENCIA, HORA_ACTUAL, HOY } from 'src/app/FUNCIONES/moment';
import { HttpService } from 'src/app/SERVICIOS/servicios.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Input() ruta:string= "";
  @Input() mensaje:string="";
  titulo:string="";
  tit_len:string="";
  esp:string="";
  ingles:string="";
  france:string="";

  lenguaje:string = localStorage.getItem("lenguaje") || "es";
  constructor(
    private readonly _router:Router,
    private readonly _serv:HttpService
  ){

    this.cargarIdioma(this.lenguaje);
  }

  navegarHacia(){
    this._router.navigate([this.ruta])
  }


  guardarIdioma(len:string){
    console.log("Lenguaje: ",len);
    localStorage.setItem("lenguaje",len);
    window.location.reload();
  }



  cargarIdioma(len:string){
    if(len === "es"){
      this.titulo = "Proyecto Calidad"
      this.tit_len ="Lenguaje";
      this.esp ="Español";
      this.ingles ="Ingles";
      this.france ="Frances";
    
    }
    if(len === "in"){
      this.titulo = "Quality Project"
      this.tit_len ="Language";
      this.esp ="Spanish";
      this.ingles ="English";
      this.france ="French";
    }
    if(len === "fc"){
      this.titulo = "Projet Qualité"
      this.tit_len ="Langue";
      this.esp ="Espagnol";
      this.ingles ="Anglais";
      this.france ="Français";
    }
  }


  async capturarActividad(tipo:string){
    const data:any = {};
    //Al cargar la pagina para sesion activas diaris traer de la base ip - fecha - contador;
    //BUSCAR POR IP y TIPO EN BASE
    const ipActual:any =  await this._serv.obtenerIP();
    const informacion =  JSON.parse(localStorage.getItem(tipo) || "{}");//traer de base por IP y TIPO
    //METODO PARA BUSAR POR IP aqui ->
    if(informacion.tipo === tipo){
      if(ipActual.ip === informacion.ip){
        data.ip = ipActual.ip;//IP TRAIDA DE BASE
        data.fecha = HOY; //FECHA TRAIDA DE BASE  
        const dias = DIADIFERENCIA(data.fecha,informacion.fecha);
        if(dias === 0){
          data.contador = informacion.contador || 0;//CONTADOR TRAIDO DE BASE
          data.fecha = HOY;
          data.contador= data.contador + 1;
          data.tipo = tipo;
          localStorage.setItem(tipo,JSON.stringify(data)); //ALMACENAR EN BASE
        }else{
          data.contador = 0;
          data.contador=+1;
          data.tipo = tipo;
          data.fecha = HOY;
          localStorage.setItem(tipo,JSON.stringify(data));//ALMACENAR EN BASE
        }
      }else{
          data.ip = ipActual.ip;
          data.contador = 0;//CONTADOR TRAIDO DE BASE
          data.contador=+1;
          data.tipo = tipo;
          data.fecha = HOY;
          localStorage.setItem(tipo,JSON.stringify(data));//ALMACENAR EN BASE
      }
    }else{
      data.ip = ipActual.ip;
      data.contador = 0;//CONTADOR TRAIDO DE BASE
      data.contador=+1;
      data.tipo = tipo;
      data.fecha = HOY;
      localStorage.setItem(tipo,JSON.stringify(data));//ALMACENAR EN BASE
    }
  }
}
