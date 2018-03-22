import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";
import { FirebaseService } from '../services/firebase.service';

@Component({
  templateUrl: './run-route.component.html'
})

export class RunRouteComponent implements OnInit {

  routesObservable: Observable<any[]>;
  constructor(private router: Router, private dbService:FirebaseService) { }
//init method to load the routes from DB
  ngOnInit() {
    this.routesObservable = this.dbService.getRoutes('/routes/12345');
  }

  
//event for the create route
//creats a redirect to a new route
  createRoute(){
    this.router.navigate(['/create-route']); 
  }

//edit route
editRoute($event:any){
  this.router.navigate(['/edit-route/' + $event.key]); 
}

  //delete route
  deleteRoute($event:any){
    this.dbService.deleteRoute('/routes/12345',$event);
  }
}
