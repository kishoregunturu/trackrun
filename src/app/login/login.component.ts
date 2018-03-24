import { Component, OnInit,AfterViewInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from "@angular/router";

declare const gapi: any;
declare const FB:any;
@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements AfterViewInit {

  private clientId:string = environment.clientId;

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
  ].join(' ');

  public auth2: any;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngAfterViewInit() {
    console.log('gapi loaed:',gapi);
    var that = this;
    gapi.load('client:auth2', function () {
      console.log('test');
      gapi.auth2.init({ client_id: that.clientId, scope: that.scope }).then(function (r) {
         console.log('gapi loaed',r);
      },function(err){});
  });
  }

  googleLogin(){
    var comp = this;
    return gapi.auth2.getAuthInstance().signIn().then(function (resp) {
      comp.authService.signed = true;
      comp.authService.User = {FirstName:resp.getBasicProfile().getGivenName(),
        LastName: resp.getBasicProfile().getFamilyName(),
        Pic:resp.getBasicProfile().getImageUrl(),
        UserId: resp.getBasicProfile().getId(),
        Name: resp.getBasicProfile().getGivenName() + ' ' + resp.getBasicProfile().getFamilyName()
      }
       console.log(comp.authService.User);
       comp.router.navigate(['/run-route']);
     }).then(function(err){
    });
  }

  facebookLogin(){
    FB.login(function(response) {
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(response) {
         console.log('Good to see you, ' + response.name + '.');
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
  });
  }
}