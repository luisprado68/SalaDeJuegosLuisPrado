import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.minLength(11),Validators.pattern(this.emailPattern)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  })
  constructor(private rutas:Router,
              private usuario:UsuarioService,
              private authSvc:AuthService,
              private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  error(){
    this.toastr.error("No existe una cuenta con el correo ingresado","Error");
  }
  completar(){
    this.toastr.warning("Porfavor complete los datos","Advertencia");
  }
  
  async loguearse(){
    if(this.loginForm.valid){
          const {email,password} = this.loginForm.value;
        try {
          const usuario = await this.authSvc.login(email,password);
          console.log(usuario);
          if(usuario){
            this.rutas.navigate(['/home']);
          }
          else{
            this.error();
          }
        } catch (error) {
          
          console.log("error",error);
        }
    }
    else{
        this.completar();
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
