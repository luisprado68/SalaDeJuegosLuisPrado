import { Injectable } from '@angular/core';
import {first} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {User} from 'firebase/auth'
// You don't need to import firebase/app either since it's being imported above
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario?:User;
  constructor(public afAuth:AngularFireAuth) { }

  async login(email:string,password:string){
    let resultado = null;
    try {
       resultado = await this.afAuth.signInWithEmailAndPassword(email,password);
      
    } catch (error) {
      console.log(error);
    }finally{
      return resultado;
    }
    
  }
  async registro(nombre:string,apellido:string,email:string,password:string){
    let resultado = null;
    try {
       resultado = await this.afAuth.createUserWithEmailAndPassword(email,password);
      
    } catch (error) {
      console.log(error);
    
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

