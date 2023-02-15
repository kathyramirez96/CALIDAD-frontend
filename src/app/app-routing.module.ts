import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { TiendaComponent } from './tienda/tienda.component';

const routes: Routes = [{
  path:"",
  pathMatch:"full",
  redirectTo:"inicio"
},{
  path:"inicio",
  component:InicioComponent
},
{
  path:"login",
  component:LoginComponent
},
{
  path:"tienda",
  component:TiendaComponent
},{
  path:"carrito",
  component:CarritoComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
