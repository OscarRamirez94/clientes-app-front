import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService :AuthService, private router : Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = route.data['role'] as string;

    if (!this.authService.isAuthenticaded()){
      this.router.navigate(['/login']);
      return false;

    }
    console.log("role :: ",role );
    if(this.authService.hasRole(role)){

      return true;
    }
      swal.fire('Acceso Denegado','El usuario no tiene permiso al recurso' + this.authService.usuario.username,'info');
      this.router.navigate(['/clientes']);
      return false;
  }

}
