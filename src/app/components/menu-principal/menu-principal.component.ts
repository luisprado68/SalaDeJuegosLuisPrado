import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {

  public usuario$:Observable<any> = this.authSvc.afAuth.user;
  constructor(private authSvc:AuthService,
              private rutas:Router) { }

  async salir(){
    try {
       await this.authSvc.logOut();
    this.rutas.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
    
  }

}
