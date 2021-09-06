import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormGroup,FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email:new FormControl(''),
    password: new FormControl(''),
  })
  constructor(private rutas:Router,
              private usuario:UsuarioService,
              private authSvc:AuthService) { }

  ngOnInit(): void {
  }

  public  irRegistro(){
    //console.log("siguiente");
    this.usuario.nombre="Luis Prado";
    this.rutas.navigate(['registro']);
    // setTimeout(()=>{
    //   this.rutas.navigate(['home']);
    // },2000)
  }
  async loguearse(){

    const {email,password} = this.loginForm.value;
    try {
      const usuario = await this.authSvc.login(email,password);
      if(usuario){
        this.rutas.navigate(['/home']);
      }
    } catch (error) {
      console.log(error);
    }
    

  }
  async loguearseGoogle(){
    try {
      const resultado = await this.authSvc.loginGoogle();
      if(resultado){
        this.rutas.navigate(['/home']);
      }
      

    } catch (error) {
      console.log(error);
    }
    
  }

}
