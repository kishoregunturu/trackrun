import { Component } from '@angular/core';
import { AuthService} from './services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router,private  loginService:AuthService) {
    if (!this.loginService.signed)
     this.router.navigate(['/login']);
  }
}
