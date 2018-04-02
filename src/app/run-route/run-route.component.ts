import { Component, OnInit,NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import { FirebaseService } from '../services/firebase.service';
import { AuthService} from '../services/auth.service';

@Component({
  templateUrl: './run-route.component.html'
})

export class RunRouteComponent implements OnInit {
  loading:Boolean = true;
  routesObservable: Observable<any[]>;
  constructor(private router: Router, private dbService:FirebaseService,private  loginService:AuthService, private __zone: NgZone) {
    
  }
//init method to load the routes from DB
  ngOnInit() {
    
    this.routesObservable = this.dbService.getRoutes('/routes/' + this.loginService.User.UserId);
    this.routesObservable.subscribe(result => {
        this.__zone.run(() => {
         this.loading = false;
        })
      }, (err => {
        console.log('test');
        this.__zone.run(() => {
          this.loading = false;

         })
      }
   ));

   //setInterval(this.loading = false, 1000);
  
}

  
//event for the create route
//creats a redirect to a new route
  createRoute(){
    this.__zone.run(() =>  this.router.navigate(['/create-route'])); 
  }

//edit route
editRoute($event:any){
  this.__zone.run(() => this.router.navigate(['/edit-route/' + $event.key])); 
}

  //delete route
  deleteRoute($event:any){
    this.dbService.deleteRoute('/routes/' +  this.loginService.User.UserId,$event);
  }
}
