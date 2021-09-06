import { Injectable } from '@angular/core';
import {first} from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {GoogleAuthProvider, User} from 'firebase/auth'
// You don't need to import firebase/app either since it's being imported above
import 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import * as firebase from 'firebase/compat';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario?:User;
  constructor(public afAuth:AngularFireAuth,private toastr:ToastrService) { }

  error(){
    this.toastr.error("Ya existe una cuenta con el correo ingresado","Error");
  }

  async loginGoogle(){
    let resultado = null;
    try {
       resultado = this.afAuth.signInWithPopup(new GoogleAuthProvider());
      
    } catch (error) {
      console.log(error);
    }
    finally{
      return resultado;
    }
  }
  async login(email:string,password:string){
    let resultado = null;
    try {
       resultado = await this.afAuth.signInWithEmailAndPassword(email,password);
      
    } catch (error) {
      
    }finally{
      return resultado;
    }
    
  }
  async registro(nombre:string,apellido:string,email:string,password:string){
    let resultado = null;
    try {
       resultado = await this.afAuth.createUserWithEmailAndPassword(email,password);
      
    } catch (error) {
      this.error();
    
  }finally{
    return resultado;
  }
  }
  async logOut(){
    try {
      await this.afAuth.signOut();
      console.log("Usurio deslogueado");
    } catch (error) {
      console.log(error);
    }
    

  }
  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}

