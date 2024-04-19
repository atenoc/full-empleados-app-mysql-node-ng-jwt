import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrivateComponent } from './components/private/private.component';
import { PublicComponent } from './components/public/public.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:'', redirectTo:'/public', pathMatch:'full'},
  {path:'public', component: PublicComponent},
  {path:'registro', component: RegistroComponent},
  {path:'login', component: LoginComponent},
  {path:'private', component: PrivateComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
