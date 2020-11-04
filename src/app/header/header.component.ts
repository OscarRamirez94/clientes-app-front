import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService :AuthService, private router :Router) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigate([''])
    swal.fire('Login','Haas cerrado session','info');
  }

}
