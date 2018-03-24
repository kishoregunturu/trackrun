import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  signed:Boolean = false;
  User:any;
  constructor() { }

}
