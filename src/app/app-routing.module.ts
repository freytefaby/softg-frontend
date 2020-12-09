import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = 
[
  {
    path:'',
    redirectTo: 'auth',
    pathMatch:'full'
  },

  {
    path:'auth',
    loadChildren: ()=> import("./core/auth/auth.module").then((d)=>d.AuthModule)
  },

  {
    path:'home',
    loadChildren: ()=> import("./core/home/home.module").then((d)=>d.HomeModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
