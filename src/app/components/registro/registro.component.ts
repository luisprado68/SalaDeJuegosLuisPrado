import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private rutas:Router) { }

  ngOnInit(): void {
  }
  irLogin(){
    this.rutas.navigate(['login']);
  }

}
