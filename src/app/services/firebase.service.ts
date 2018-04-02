import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { RouteMap } from '../models/route-map';
import { AnonymousSubject } from 'rxjs';

@Injectable()
export class FirebaseService {
  routesObservable: Observable<RouteMap[]>;

  constructor(private db: AngularFireDatabase){ }

  getRoutes(listPath:string): Observable<RouteMap[]> {
    try{
      var list = this.db.list(listPath).snapshotChanges();
      console.log('list',list);

      return list.map(changes => {
        console.log('test');
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
    }catch{
      console.log('error');
    }
  }

  getRoute(listPath:string,key:string):Observable<RouteMap>{
    return this.db.object(listPath + '/' + key).valueChanges();
  }

  addRoutes(listPath:string,route:RouteMap) {
     this.db.list(listPath).push(route);
  }

  deleteRoute(listPath:string,route:any) {
    this.db.object(listPath + '/' + route.key).remove();
  }

 editRoute(listPath:string,route:any) {
  this.db.object(listPath + '/' + route.key).update(route);
 }
}
