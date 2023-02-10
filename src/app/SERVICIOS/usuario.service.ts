import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { enviroment } from 'src/evirment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private readonly _http:HttpClient) { }


  async obtenerIP(){
    return  lastValueFrom(this._http.get("http://api.ipify.org/?format=json"));
  }


  async guardarUsuari(datos:any){
    const url = `${enviroment.host}/usuarios/crear-usuarios`;
    return this._http.post(url,datos);
  }


  async obtenerUsuarios(){
    const url = `${enviroment.host}/usuarios/obtener-usuarios`;
    return this._http.get(url);
  }

}