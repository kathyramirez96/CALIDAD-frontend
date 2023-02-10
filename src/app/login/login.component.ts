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

  lenguaje:string = localStorage.getItem("lenguaje") || "es";
  CLAVE:string="";
  SALIDA:any;
  existeUsuario:boolean = false;
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
  t_datos:usuario = {
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



  titulo:string="";
  titluo2:string="";
  t_user:string="";
  t_pass:string="";
  t_in:string="";
  t_reg:string="";
  t_comp:string="";
  t_guard:string="";
  t_Regresar:string="";
  registrar:boolean = false;
  constructor(
    private readonly _form: FormBuilder,
    private readonly _serv:HttpService,
    private readonly _user:UsuarioService
  ) {}

  async ngOnInit() {
    //CAPTURAR LA ACTIVIDAD CADA QUE INGRESA
    this.cargarIdioma(this.lenguaje)
    await this.capturarActividad("sesion");
    (await this._user.obtenerUsuarios()).subscribe(res=>{
      //console.log(res);
    })
    
  }

  cargarIdioma(len:string){
    if(len === "es"){
      this.titulo = "Iniciar Sesion"
      this.titluo2 = "Registrarse"
      this.t_user = "USUARIO";
      this.t_pass = "CONTRASEÑA";
      this.t_in="INGRESAR"
      this.t_reg="REGISTRARSE"
      this.t_comp="COMPROBAR"
      this.t_guard = "GUARDAR"
      this.t_datos.nombre = "NOMBRE"
      this.t_datos.cedula="CEDULA";
      this.t_datos.apellido="APELLIDO";
      this.t_datos.direccion="DIRECCION";
      this.t_datos.correo="CORREO";
      this.t_datos.provincia="PROVINCIA";
      this.t_datos.pais="PAIS";
      this.t_datos.genero="GENERO";
      this.t_datos.telefono="TELEFONO";
      this.t_datos.celular="CELULAR";
      this.t_datos.usuario="USUARIO";
      this.t_datos.clave="CLAVE";
      this.t_datos.sangre="TIPO SANGRE";
      this.t_datos.altura="ALTURA";
      this.t_datos.peso="PESO";
      this.t_Regresar = "REGRESAR"
    }
    if(len === "in"){
      this.titulo = "Log in"
      this.titluo2 = "register";
      this.t_user = "USER";
      this.t_pass = "PASSWORD";
      this.t_in="GET INTO"
      this.t_reg="CHECK IN"
      this.t_comp="FIND OUT"
      this.t_guard = "SAVE"
      this.t_datos.nombre = "NAME"
      this.t_datos.cedula="CEDULA";
      this.t_datos.apellido="APELLIDO";
      this.t_datos.direccion="DIRECCION";
      this.t_datos.correo="CORREO";
      this.t_datos.provincia="PROCINVIA";
      this.t_datos.pais="PAIS";
      this.t_datos.genero="GENERO";
      this.t_datos.telefono="TELEFONO";
      this.t_datos.celular="CELULAR";
      this.t_datos.usuario="USUARIO";
      this.t_datos.clave="CLAVE";
      this.t_datos.sangre="TIPO SANGRE";
      this.t_datos.altura="ALTURA";
      this.t_datos.peso="PESO";
      this.t_Regresar = "RETURN"
    }
    if(len === "fc"){
      this.titulo = "Commencer la session"
      this.titluo2 = "Enregistrement";
      this.t_user = "UTILISATEUR";
      this.t_pass = "MOT DE PASSE";
      this.t_in="ENTRER DANS"
      this.t_reg="ENREGISTREMENT"
      this.t_comp="DÉCOUVRIR",
      this.t_guard = "SAUVEGARDER";
      this.t_datos.nombre = "NOM"
      this.t_datos.cedula="IDENTIFICATION";
      this.t_datos.apellido="LAST NAME";
      this.t_datos.direccion="ADDRESS";
      this.t_datos.correo="MAIL";
      this.t_datos.provincia="PROVINCE";
      this.t_datos.pais="COUNTRY";
      this.t_datos.genero="GENDER";
      this.t_datos.telefono="PHONE";
      this.t_datos.celular="CELL PHONE";
      this.t_datos.usuario="USER";
      this.t_datos.clave="PASSWORD";
      this.t_datos.sangre="BLOOD TYPE";
      this.t_datos.altura="HEIGHT";
      this.t_datos.peso="WEIGHT";
      this.t_Regresar = "RETOURNER";
    }
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


  ingresar(){
    if(this.existeUsuario)
      return MostrarMensaje("Bienvenido")
    return MostrarMensaje("Credenciales incorrectas")
  }

  onKeypressEvent(event: any){}


  comprobar(){
    MostrarComprobar();
  }


  obtenerContadores(tipo:string){
    let contador = 0;
    try{
      contador = JSON.parse(JSON.stringify(localStorage.getItem(tipo)));
      contador = JSON.parse(""+contador).contador      
    }catch(err){
      contador = 0;
    }
    return ""+tipo+"es = "+contador;
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
