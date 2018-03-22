import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { v4 as uuid } from 'uuid';
import { RouteMap } from '../models/route-map';
import { MouseEvent } from '@agm/core';
import { MapService } from '../services/map.service';
import { FirebaseService } from '../services/firebase.service';
import { Router, ActivatedRoute } from "@angular/router";
import { ReadVarExpr } from '@angular/compiler';
@Component({
  templateUrl: './create-route.component.html'
})
export class CreateRouteComponent implements OnInit {
  address: string;
  distance: number = 0;
  loading: boolean = true;
  name: string;
  error: string;
  lat: number = 39.833333;
  lng: number = -98.583333;
  zoom: number = 8;
  markers: marker[] = [];
  startmarkers: marker[] = [];
  key: string;
  constructor(private dbService: FirebaseService, private mapService: MapService, private __zone: NgZone, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.key = this.route.snapshot.paramMap.get('id');
    if (this.key) {
      
      var r = this.dbService.getRoute('/routes/12345', this.key).subscribe((route) => {
        if (route.Name && route.Address){
          console.log('Current Route: ', route);
          console.log('this',this);
          this.name = route.Name;
          this.address = route.Address;
          this.markers = route.Markers;
          this.distance = route.Distance;
          
          if (this.markers.length > 0){
            this.startmarkers = [this.markers[0]];
            this.lat = this.markers[0].lat;
            this.lng = this.markers[0].lng;
            this.zoom = 14;
          }
          this.loading = false;
        }else{
          this.error = 'Error getting route information.';
          this.loading = false;
        }});
    } else {
      this.loading = false;
    }
  }

  mapClicked($event: MouseEvent) {
    console.log('marker', $event);
    if (this.markers.length == 0) {
      this.startmarkers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
      this.getAddress();
    }
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
    if (this.markers.length > 1)
      this.distance += this.mapService.getDistanceBetweenPoints(this.markers[this.markers.length - 1], this.markers[this.markers.length - 2]);
  }

  searchAddress() {
    if (this.address && this.address != '') {
      this.markers = [];
      this.startmarkers = [];
      this.mapService.getLatLan(this.address)
        .subscribe(
          result => {
            this.__zone.run(() => {
              this.lat = result.lat();
              this.lng = result.lng();
              this.zoom = 14;
            })
          },
          error => console.log(error),
          () => console.log('Geocoding completed!')
        )
    }
  }

  getLatLon() {
    this.mapService.getLatLan(this.address)
      .subscribe(
        result => {
          this.__zone.run(() => {
            this.lat = result.lat();
            this.lng = result.lng();
          })
        },
        error => console.log(error),
        () => console.log('Geocoding completed!')
      );
  }

  clearRoute() {
    this.markers = [];
    this.startmarkers = [];
    this.distance = 0;
  }

  clearLastMarker() {
    if (this.markers.length > 0) {
      if (this.markers.length == 1) {
        this.startmarkers = [];
      }
      if (this.markers.length >= 2) {
        this.distance -= this.mapService.getDistanceBetweenPoints(this.markers[this.markers.length - 1], this.markers[this.markers.length - 2]);
        if (this.distance < 0)
          this.distance = 0;
      }
      this.markers.splice(this.markers.length - 1, 1);
    }
  }

  getAddress() {
    this.mapService.getAddress(this.startmarkers[0].lat, this.startmarkers[0].lng)
      .subscribe(
        result => {
          this.__zone.run(() => {
            this.address = result;

          })
        },
        error => console.log(error),
        () => console.log('Geocoding completed!')
      );
  }

  saveRoute() {
    this.error = '';

    if (!this.name || this.name == '') {
      this.name == this.address;
    }
    if (this.address == '' || !this.address) {
      this.error = 'Enter address';
    }
    this.loading = true;
    var r = new RouteMap( this.name, this.address, this.markers, this.distance);
    if (this.key && this.key != '') {
      console.log('edit');
      console.log('Route saved-', r);
      r.key = this.key;
      this.dbService.editRoute('/routes/12345', r);
    } else {
      console.log('Route saved-', r);
      this.dbService.addRoutes('/routes/12345', r);
    }
    this.loading = false;
    this.router.navigate(['/run-route']);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  mapReady($event: any) {
    console.log($event);
  }

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
