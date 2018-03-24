import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: 'app-navbar.component.html',
  styles: []
})

export class AppNavbarComponent implements OnInit {

  constructor(private  loginService:AuthService,private route:Router) { }

  ngOnInit() {
  }

  logout(){
    this.loginService.signed = false;
    this.loginService.User = null;
    //this.route.navigate(['/login']);
  }

}
