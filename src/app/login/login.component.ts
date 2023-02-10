import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MostrarComprobar } from '../FUNCIONES/mensajes';
import { DIADIFERENCIA, HOY } from '../FUNCIONES/moment';
import { HttpService } from '../SERVICIOS/servicios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  registrar:boolean = false;
  constructor(
    private readonly _form: FormBuilder,
    private readonly _serv:HttpService
  ) {}

  async ngOnInit() {
    //CAPTURAR LA ACTIVIDAD CADA QUE INGRESA
    await this.capturarActividad("sesion");
  }

  irRegistro(){
    if(this.registrar)
      this.registrar = false;
    else
      this.registrar = true;
  }




  comprobar(){
    MostrarComprobar();
  }



  async capturarActividad(tipo:string){
    const data:any = {};
    //Al cargar la pagina para sesion activas diaris traer de la base ip - fecha - contador;
    //BUSCAR POR IP y TIPO EN BASE
    const ipActual:any =  await this._serv.obtenerIP();
    const informacion =  JSON.parse(localStorage.getItem("data") || "{}");//traer de base por IP y TIPO
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
          localStorage.setItem("data",JSON.stringify(data)); //ALMACENAR EN BASE
        }else{
          data.contador = 0;
          data.contador=+1;
          data.tipo = tipo;
          data.fecha = HOY;
          localStorage.setItem("data",JSON.stringify(data));//ALMACENAR EN BASE
        }
      }else{
          data.ip = ipActual.ip;
          data.contador = 0;//CONTADOR TRAIDO DE BASE
          data.contador=+1;
          data.tipo = tipo;
          data.fecha = HOY;
          localStorage.setItem("data",JSON.stringify(data));//ALMACENAR EN BASE
      }
    }else{
      data.ip = ipActual.ip;
      data.contador = 0;//CONTADOR TRAIDO DE BASE
      data.contador=+1;
      data.tipo = tipo;
      data.fecha = HOY;
      localStorage.setItem("data",JSON.stringify(data));//ALMACENAR EN BASE
    }
  }
}
