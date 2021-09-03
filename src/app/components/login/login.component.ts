import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private rutas:Router,
              private usuario:UsuarioService) { }

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

}
