import Swal from 'sweetalert2'

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

export function MensajeError(titulo:string,mensaje:string){
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