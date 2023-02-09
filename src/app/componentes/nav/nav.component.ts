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

  constructor(
    private readonly _router:Router
  ){}

  navegarHacia(){
    this._router.navigate([this.ruta])
  }
}
