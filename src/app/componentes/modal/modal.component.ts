import { AfterViewInit, Component } from '@angular/core';
import { cambiarValorMatriz, generarMatriz, generarMatrizGuia, generarValor } from 'src/app/FUNCIONES/funciones';
import { MostrarMensaje } from 'src/app/FUNCIONES/mensajes';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit  {
  valor:number=generarValor(3,4);
  colores:number=4;
  iguales:boolean = false;
    matrizA:any;
    matrizB:any;
    posibles:any = ["red","blue","yellow"];
    estilo:any=["background-color: white;","background-color: red;","background-color: blue;","background-color: yellow;"];

    ngAfterViewInit (){
      this.generarFIGURA();
  }


  cambiarValor(matriz:any,x:any,y:any){
    this.matrizA = cambiarValorMatriz(matriz,x,y,this.valor);
  }

  generarFIGURA(){
    setTimeout(() => {
      this.matrizA = generarMatriz(this.valor);
      this.matrizB = generarMatrizGuia(this.valor,this.colores);
        }, 0); 
  }


  comprobar(){
    this.iguales = true;
    for(let i = 0; i < this.valor; i++){
      for(let j = 0; j < this.valor; j++){
        if(this.matrizA[i][j] !== this.matrizB[i][j])
          this.iguales = false;
      }
    }
    this.generarFIGURA();
    localStorage.setItem("humano",""+this.iguales);
    if(this.iguales)
      MostrarMensaje("Felicidades, a sueprado la prueba")
    else
      MostrarMensaje("Lo sentimos falló, intente nuevamente")
    return this.iguales;
  }
}
