import { Component } from '@angular/core';
import { DIADIFERENCIA, DIADIFERENCIAHORA, HORA_ACTUAL, HOY } from '../FUNCIONES/moment';
import { HttpService } from '../SERVICIOS/servicios.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  
  lenguaje:string = localStorage.getItem("lenguaje") || "es";
  titulo:string="";
  ej:string="";
  msm:string=""
  constructor(
    private readonly _serv:HttpService
  ){
    this.cargarIdioma(this.lenguaje);
    if(this.calcularTiempo() < 3){      
      this.capturarActividad("rapidas");
    }
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
    return Math.abs(res);
  }

  cargarIdioma(len:string){    
    console.log(HORA_ACTUAL);

    if(len === "es"){
      this.titulo = "Iniciar Sesion"
      this.ej = "Ejemplo";
      this.msm = "Un texto de ejemplo rápido para construir sobre el Ejemplo y componer la mayor parte del contenido de la tarjeta.";
    }
    if(len === "in"){
      this.titulo = "Log in"
      this.ej = "Example";
      this.msm = "Some quick example text to build on the Ejemplo and make up the bulk of the card's content.";
    }
    if(len === "fc"){
      this.titulo = "Commencer la session"
      this.ej = "Exemple";
      this.msm = "Un exemple de texte rapide pour s'appuyer sur l'exemple et constituer l'essentiel du contenu de la carte.";
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
