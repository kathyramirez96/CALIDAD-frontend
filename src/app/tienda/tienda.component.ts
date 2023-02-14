import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent {
  constructor(
    private readonly _router:Router
  ){
 this.comprobarIngreso();
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

}
