import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';


import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
              private authSvc:AuthService,
              private toastr:ToastrService) { }

  completar(){
    this.toastr.warning("Porfavor complete los datos","Advertencia");
  }
  exito(){
    this.toastr.success("Su cuenta se ha creado exitosamente","Correcto");
  }
  
  async registrarse(){

    if(this.registroForm.valid){
      const {nombre,apellido,email,password} = this.registroForm.value;
      try {
        const usuario = await this.authSvc.registro(nombre,apellido,email,password);
        if(usuario){
          this.exito();
          const usuarioLogin = await this.authSvc.login(email,password);
        if(usuarioLogin){
          this.rutas.navigate(['/home']);
        }
          
        }
      } catch (error) {
        console.log(error);
        this.registroForm.reset();
      }
      
    }else{
      
      this.completar();
      
    }
    
   
    
    
  }
  ngOnInit(): void {
  }
  
  
  

}
