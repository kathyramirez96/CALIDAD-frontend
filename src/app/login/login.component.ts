import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MensajeError, MensajeExito, MostrarComprobar, MostrarMensaje } from '../FUNCIONES/mensajes';
import { DIADIFERENCIA, DIADIFERENCIAHORA, HORA_ACTUAL, HORA_NORMAL, HORA_NUEVA, HOY } from '../FUNCIONES/moment';
import { usuario } from '../INTERFACES/usuario.interface';
import { HttpService } from '../SERVICIOS/servicios.service';
import { UsuarioService } from '../SERVICIOS/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  ingresoInfo:any ={
    user:"",
    pass:""
  };
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


  horaInicio:string = "";
  horaFin:string = "";

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
    private readonly _user:UsuarioService,
    private readonly _router:Router
  ) {
    this.calcularTiempo2();
  }

  async ngOnInit() {   
    if(this.calcularTiempo() < 3){
      
      console.log("pasa");
      this.capturarActividad("rapidas");
    }
    this.limpiarVariables();
    //CAPTURAR LA ACTIVIDAD CADA QUE INGRESA    
    this.cargarIdioma(this.lenguaje);
    await this.capturarActividad("sesion");
    // (await this._user.obtenerUsuarios()).subscribe(res=>{
    //   //console.log(res);
    // })
    
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


  calcularTiempo2(){
    localStorage.setItem("nv2",""+0);
    this.horaInicio = HORA_ACTUAL;
    console.log(this.horaInicio);
    
  }

  calcularIngreso(){
   this.horaFin = HORA_NUEVA;
   const diferencia = DIADIFERENCIAHORA(this.horaFin, this.horaInicio);
   const a = localStorage.setItem("nv2",diferencia)
   return diferencia;
  }
 


  irRegreso(){
    return "inicio";
  }

  limpiarVariables(){
    localStorage.setItem("humano","false");
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
     return MensajeError("ERROR","Ingresar todos los datos",await this.obtenerIP());
    if(!this.validarCorreo(this.datos.correo))
      return MensajeError("ERROR","El correo esta incorrecto por favor verificar",await this.obtenerIP());
    if(!this.validarTienrNumeros(this.datos.nombre))
      return MensajeError("ERROR","El nombre no puede tener números",await this.obtenerIP());
    if(!this.validarTienrNumeros(this.datos.apellido))
      return MensajeError("ERROR","El apellido no puede tener números",await this.obtenerIP());
    if(!this.validarTienrNumeros(this.datos.provincia))
      return MensajeError("ERROR","La provincia no puede tener números",await this.obtenerIP());
    if(!this.validarTienrNumeros(this.datos.pais))
      return MensajeError("ERROR","El pais no puede tener números",await this.obtenerIP());
    if(!this.validaLongitud(""+this.datos.cedula,10))
      return MensajeError("Error","Longitud de la cédula incorrecta", await this.obtenerIP());
    if(!this.validaLongitud(""+this.datos.telefono,8))
      return MensajeError("Error","Longitud del teléfono incorrecta, añadir codigo provincia",await this.obtenerIP());
    if(!this.validaLongitud(""+this.datos.celular,9))
      return MensajeError("Error","Longitud del célular es incorrecta",await this.obtenerIP());
    if(!this.validarHumano())
      return MensajeError("ERROR","Comprueba que eres humano",await this.obtenerIP());
    if(this.CLAVE !== this.datos.clave)
      return MensajeError("ERROR","Las claves no coinciden",await this.obtenerIP());

    
    
     const a:any = await lastValueFrom(await this._user.guardarUsuari(this.datos));
     console.log(a);

     if(a.estado === "error")
      return MensajeError(a.estado,a.mensaje,await this.obtenerIP());
    this.datos = {};
    return MensajeExito("Éxito","El usuario se creó");
  }


  async obtenerIP(){
    const ip:any = await this._serv.obtenerIP(); 
    return  ip
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


  validarTienrNumeros(texto:any){
    let pasa = true;
    if(texto === undefined)
      return false;
    for(let i = 0; i < texto.length; i++){
      if(texto.charAt(i) in [1,2,3,4,5,6,7,8,9,0])
        return false
    }
    return pasa;
  }

  validaLongitud(texto:any, len:number){
    let esCorrecto = true;    
    if(texto.length !== len)
      esCorrecto = false;
    return esCorrecto
  }

  validarCorreo(texto:any){
    let pasa = false;
    let caracter = 0;
    if(texto === undefined)
      return false;
    for(let i = 0; i < texto.length; i++){
      if(texto.charAt(i) === "@" || texto.charAt(i) === ".")
        caracter++;
    }
    if(caracter > 1)
      return true;
    return pasa;
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


  tomarTiempo(){
    const horaInicio = HORA_NORMAL;
    console.log("inicio",horaInicio);
    localStorage.setItem("tiempoCompra",horaInicio)
    window.location.href="tienda";
  }
  

  async ingresar(){
    if(this.ingresoInfo.user==="" || this.ingresoInfo.pass==="")
      return MensajeError("ERROR","Los campos están vacíos",await this.obtenerIP());
    
    const usuario:any = await lastValueFrom(
      await this._user.iniciarSesion({usuario:this.ingresoInfo.user,clave:this.ingresoInfo.pass}));
    
    console.log(usuario);
    
    if(usuario.estado === "error" )
      return MensajeError(usuario.estado,usuario.mensaje,await this.obtenerIP());

    if(usuario.status)
    return MensajeError("ERROR","Informacion Incorrecta",await this.obtenerIP());
    
      if(usuario){
        this.tomarTiempo();
        this.calcularIngreso();
        const a = localStorage.getItem("nav2")
        console.log(a);
        
        MensajeExito("Éxito","Bienvenido")
        localStorage.setItem("sesion",usuario)
        return this._router.navigate(["tienda"]);
      }
    
  }

  onKeypressEvent(event: any){}


  comprobar(){
    MostrarComprobar();
  }


  obtenerContadores(mensaje:string,tipo:string){
    let contador = 0;
    try{
      contador = JSON.parse(JSON.stringify(localStorage.getItem(tipo)));
      contador = JSON.parse(""+contador).contador      
    }catch(err){
      contador = 0;
    }
    return ""+mensaje+"es = "+contador + " veces";
  }


  obtenerTiempoMensaje(mensaje:string){    
    return ""+mensaje+"es = "+localStorage.getItem("tnav") + " segundos";
  }

  obtenerTiempoMensaje2(mensaje:string){    
    return ""+mensaje+"es = "+localStorage.getItem("tiempoTransaccion") + " segundos";
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
