import { Component } from '@angular/core';
import { generarOfset } from 'src/app/FUNCIONES/funciones';
import { MostrarMensaje } from 'src/app/FUNCIONES/mensajes';
import { DIADIFERENCIA, HOY } from 'src/app/FUNCIONES/moment';
import { HttpService } from 'src/app/SERVICIOS/servicios.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
  constructor(
    private readonly _serv:HttpService,
  ) { }
  main:boolean = !false;
  bloq:boolean = !false;
  desb:boolean = !false;
  recu:boolean = !false;
  sms:boolean = !false;
  cedula:string = "";
  clave:string = "";
  celular:string = "";
  
  ngOnInit(): void {
  }


  mostrarPagina(cod:number){
    this.capturarActividad("chatbox");
    this.cedula = "";
    this.clave = "";
    this.celular = "";
    localStorage.setItem("intento","0");
    this.main = !(1 === cod);
    this.bloq = !(2 === cod);
    this.desb = !(3 === cod);
    this.recu = !(4 === cod);
    this.sms = !(5 === cod);
  }


  bloquear(){
    //METODO PARA BLOQUEAR EN BASE
    if(this.cedula !== undefined && this.cedula !== null && this.cedula !== "" ){
      console.log(this.cedula);
      MostrarMensaje(`Cédula ${this.cedula} fue bloqueada`);
      this.mostrarPagina(1);
    }else{
      MostrarMensaje("Ingrese una cédula");
    }
  }

  enviarSMS(){
    //OBTENER TELEFONO DE BASE POR CÉDULA
    console.log(this.cedula);
    //METODO PARA CONSULTAR INFORMACION POR CÉDULA
    const tel = '0987654321';
    //GENERAR CLAVE TEMPORAL
    const clave = generarOfset();
    console.log(clave);
    //ALMACENAR clave en base
    localStorage.setItem("clave",clave);
    MostrarMensaje(`Se envió SMS a ${tel}`);
    this.mostrarPagina(5);
  }
  desbloquear(){
    const intento = localStorage.getItem("intento") || 0;
    //traer clave de base
    const clave = localStorage.getItem("clave");//traer de base 
    console.log(clave);
    console.log(this.clave);
    //Metodo para enviar clave por algun medio

    if(this.clave === clave){
      MostrarMensaje("Usuario desbloqueado");
      this.mostrarPagina(1);
    }
    else{
      this.clave = "";
      MostrarMensaje("La clave ingresada es incorrecta")
      if(+intento >= 2 ){
        MostrarMensaje("Intentos Superados");
        this.mostrarPagina(1);
      }else{
        localStorage.setItem("intento",""+(+intento+1));
      }
    }
    
  }

  recuperar(){
    const cel = this.celular;//consultar en base por celular
    if(cel !== undefined && cel !== null && cel !== "")
        MostrarMensaje(`Usuario enviado a ${cel}`);
    else
        MostrarMensaje("No se encontro el usuario");
    this.mostrarPagina(1);
  }

  minimisar(){
    if(this.main === false)
      this.mostrarPagina(999);
    else
      this.mostrarPagina(1);
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
