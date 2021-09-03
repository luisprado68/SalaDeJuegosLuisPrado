import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  nombre:string;
  
  constructor() {
    this.nombre = "";
   }
}
