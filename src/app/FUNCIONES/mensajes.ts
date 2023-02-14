import Swal from 'sweetalert2'
import { DIADIFERENCIA, HOY } from './moment';

export function MostrarMensaje(msm:string){
    Swal.fire(msm);
}

export function MostrarComprobar(){
    Swal.fire({
        title: '<strong>¿ES HUMANO?</strong>',
        html:'',
        showCloseButton: false,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'<i class="fa fa-thumbs-up"></i> Comprobar!',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then((result:any)=>{
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
      });
}

export function MensajeError(titulo:string,mensaje:string, ip:string){
  capturarActividad("error",ip);
  Swal.fire({
    icon: 'error',
    title: titulo,
    text: mensaje
  })
}


export function MensajeExito(titulo:string,mensaje:string){
  Swal.fire({
    icon: 'success',
    title: titulo,
    text: mensaje
  })
}



export async function capturarActividad(tipo:string, ip:string){
  const data:any = {};
  //Al cargar la pagina para sesion activas diaris traer de la base ip - fecha - contador;
  //BUSCAR POR IP y TIPO EN BASE
  const ipActual:any =  ip;
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