import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Input() ruta:string= "";
  @Input() mensaje:string="";
  titulo:string="";
  tit_len:string="";
  esp:string="";
  ingles:string="";
  france:string="";

  lenguaje:string = localStorage.getItem("lenguaje") || "es";
  constructor(
    private readonly _router:Router
  ){

    this.cargarIdioma(this.lenguaje);
  }

  navegarHacia(){
    this._router.navigate([this.ruta])
  }


  guardarIdioma(len:string){
    console.log("Lenguaje: ",len);
    localStorage.setItem("lenguaje",len);
    window.location.reload();
  }



  cargarIdioma(len:string){
    if(len === "es"){
      this.titulo = "Proyecto Calidad"
      this.tit_len ="Lenguaje";
      this.esp ="Español";
      this.ingles ="Ingles";
      this.france ="Frances";
    
    }
    if(len === "in"){
      this.titulo = "Quality Project"
      this.tit_len ="Language";
      this.esp ="Spanish";
      this.ingles ="English";
      this.france ="French";
    }
    if(len === "fc"){
      this.titulo = "Projet Qualité"
      this.tit_len ="Langue";
      this.esp ="Espagnol";
      this.ingles ="Anglais";
      this.france ="Français";
    }
  }
}
