import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  
  lenguaje:string = localStorage.getItem("lenguaje") || "es";
  titulo:string="";
  ej:string="";
  msm:string=""
  constructor(){
    this.cargarIdioma(this.lenguaje);
  }


  cargarIdioma(len:string){
    if(len === "es"){
      this.titulo = "Iniciar Sesion"
      this.ej = "Ejemplo";
      this.msm = "Un texto de ejemplo rápido para construir sobre el Ejemplo y componer la mayor parte del contenido de la tarjeta.";
    }
    if(len === "in"){
      this.titulo = "Log in"
      this.ej = "Example";
      this.msm = "Some quick example text to build on the Ejemplo and make up the bulk of the card's content.";
    }
    if(len === "fc"){
      this.titulo = "Commencer la session"
      this.ej = "Exemple";
      this.msm = "Un exemple de texte rapide pour s'appuyer sur l'exemple et constituer l'essentiel du contenu de la carte.";
    }
  }
}
