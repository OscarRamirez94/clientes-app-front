import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public titulo :string = "Porfavor Sign in!";
  usuario :Usuario;
  constructor(private auth :AuthService, private router :Router) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {

    if(this.auth.isAuthenticaded()){

     // this.router.navigate(['/clientes']);
      swal.fire('Login', 'ya estas autenticado' + this.auth.usuario.username ,'info');
    }
  }

  login():void{

    if(this.usuario.username == null || this.usuario.password == null ){
      swal.fire('Error Login', 'Usuario o password vacios','error');
    }
    this.auth.login(this.usuario).subscribe(
      response =>{

        this.auth.guardarUsuario(response.access_token);
        this.auth.guardarToken(response.access_token);
        let usuario = this.auth.usuario;


        this.router.navigate(['/clientes']);
        swal.fire('Bienvenido', 'Hola ' + usuario.username + "  "+ usuario.apellido ,'success');

      }, err =>{
        if(err.status == 400){
          swal.fire('Error Login', 'Usuario o password incorrectos!','error');
        }
      });
  }
}
