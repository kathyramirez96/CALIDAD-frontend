import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { MostrarComprobar, MostrarMensaje } from '../FUNCIONES/mensajes';
import { DIADIFERENCIA, HOY } from '../FUNCIONES/moment';
import { usuario } from '../INTERFACES/usuario.interface';
import { HttpService } from '../SERVICIOS/servicios.service';
import { UsuarioService } from '../SERVICIOS/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  CLAVE:string="";
  SALIDA:any;
  datos:usuario = {
    nombre:"",
    cedula:"",
    apellido:"",
    direccion:"",
    correo:"",
    provincia:"",
    pais:"",
    genero:"",
    telefono:"",
    celular:"",
    usuario:"",
    clave:"",
    sangre:"",
    altura:"",
    peso:""
  };

  registrar:boolean = false;
  constructor(
    private readonly _form: FormBuilder,
    private readonly _serv:HttpService,
    private readonly _user:UsuarioService
  ) {}

  async ngOnInit() {
    //CAPTURAR LA ACTIVIDAD CADA QUE INGRESA
    await this.capturarActividad("sesion");
    (await this._user.obtenerUsuarios()).subscribe(res=>{
      console.log(res);
      
    })
    
  }

  irRegistro(){
    if(this.registrar)
      this.registrar = false;
    else
      this.registrar = true;
  }


  async GUARDAR(){
 
    if(!this.validar())
     return MostrarMensaje("Ingresar todos los datos");
    
    if(!this.validarHumano())
      return MostrarMensaje("Comprueba que eres humano");
    
    if(this.CLAVE !== this.datos.clave)
      return MostrarMensaje("Las claves no coinciden")
    
     const a = await lastValueFrom(await this._user.guardarUsuari(this.datos));
     console.log(a);
     

  }


  validar(){
    let a = true;
    a = a && this.datos.nombre !== "";
    a = a && this.datos.cedula !== "";
    a = a && this.datos.apellido !== "";
    a = a && this.datos.direccion !== "";
    a = a && this.datos.correo !== "";
    a = a && this.datos.provincia !== "";
    a = a && this.datos.pais !== "";
    a = a && this.datos.genero !== "";
    a = a && this.datos.telefono !== "";
    a = a && this.datos.celular !== "";
    a = a && this.datos.usuario !== "";
    a = a && this.datos.clave !== "";
    a = a && this.datos.sangre !== "";
    a = a && this.datos.altura !== "";
    a = a && this.datos.peso !== "";  
    return a;
  }


  validarHumano(){
    try{
      const a = localStorage.getItem("humano");
      if(a === "true"){
        return true;
      }
      return false;
    }catch(err){
      return false;
    }
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
