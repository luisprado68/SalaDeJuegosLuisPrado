import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';


import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public registroForm = new FormGroup({
    nombre:new FormControl('', [Validators.required,Validators.minLength(5)]),
    apellido:new FormControl('',[Validators.required,Validators.minLength(5)]),
    email:new FormControl('',[Validators.required,Validators.minLength(11),Validators.pattern(this.emailPattern)]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  });
  constructor(private rutas:Router,
              private authSvc:AuthService) { }
  async registrarse(){

    if(this.registroForm.valid){
      const {nombre,apellido,email,password} = this.registroForm.value;
      try {
        const usuario = await this.authSvc.registro(nombre,apellido,email,password);
        if(usuario){
          this.rutas.navigate(['/home']);
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      console.log("No valido");
    }
   
    
    
  }
  ngOnInit(): void {
  }
  
  
  irLogin(){
    this.rutas.navigate(['login']);
  }

}
