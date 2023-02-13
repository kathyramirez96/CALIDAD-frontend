import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss']
})
export class TiendaComponent {
  
  logeado:any =  "";
  
  constructor(
    private readonly _router:Router
  ){
    this.validarIngreso();
  }


  validarIngreso(){
    this.logeado = localStorage.getItem("logeo");
    if(this.logeado === null || this.logeado === undefined || this.logeado === ""){
      this._router.navigate(["inicio"]);
    }
  }

  salir(){
    localStorage.setItem("logeo","");
    return "inicio";
  }

}
