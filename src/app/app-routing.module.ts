import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';


const routes: Routes = [
  {path: '', redirectTo: 'Login', pathMatch: 'full'/*, canActivate: [SecureInnerPagesGuard]*/},
  {path: 'Login' , component: LoginComponent/*, canActivate: [SecureInnerPagesGuard]*/},
  {path: 'Registro' , component: RegistroComponent/*, canActivate: [SecureInnerPagesGuard]*/}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
