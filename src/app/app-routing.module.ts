import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegistroComponent } from './auth/pages/registro/registro.component';

const routes: Routes = [
  
  {path:'auth',
  loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule)
  },
  {path:'home',component:HomeComponent},
  {path:'perfil',component:PerfilComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'**',component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
