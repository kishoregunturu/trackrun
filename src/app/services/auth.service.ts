import { Injectable } from '@angular/core';
import {Router, CanLoad} from "@angular/router";

@Injectable()
export class AuthService implements CanLoad{
  signed:Boolean = false;
  User:any;
  constructor(private router: Router) { }

  //method to protect users from accessing resources without loggin
  canLoad(): boolean {
    if (!this.signed) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
