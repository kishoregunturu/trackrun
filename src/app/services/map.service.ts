import { Injectable, NgZone } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { Observable, Observer } from 'rxjs';
import {marker} from '../models/route-map';

declare var google: any;

@Injectable()
export class MapService extends GoogleMapsAPIWrapper{ 
    constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
        super(__loader, __zone);
    }

    //get address from lat and long
    getLatLan(address: string) {
        console.log('Getting Address - ', address);
        let geocoder = new google.maps.Geocoder();
        return Observable.create(observer => {
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].geometry.location);
                    observer.complete();                    
                } else {
                    console.log('Error - ', results, ' & Status - ', status);
                    observer.next({});
                    observer.complete();
                }
            });
        })
    }

    //Get address from latitude and longitude
    getAddress(Lat:number, Lng:number) {
        console.log('Getting Address - ', Lat,Lng);
        var latlng = {lat: Lat, lng: Lng};
        let geocoder = new google.maps.Geocoder();
        return Observable.create(observer => {
            geocoder.geocode( { 'location': latlng}, function(results, status) {
                console.log(' Address result - ', results,status);
                if (status == google.maps.GeocoderStatus.OK) {
                    observer.next(results[0].formatted_address);
                    observer.complete();                    
                } else {
                    console.log('Error - ', results, ' & Status - ', status);
                    observer.next({});
                    observer.complete();
                }
            });
        })
    }

    getDistance(markers:marker[]){
        var d = 0;
        var  i = markers.length -1;
        while(i > 0){
            d += this.getDistanceBetweenPoints(markers[i],markers[i-1]);
            i -= 1;
        }
        return d;
    }

    getDistanceBetweenPoints(marker1:marker,marker2:marker)
    {
        var R = 6371/1.6; // metres
        var φ1 = marker1.lat*(Math.PI)/180;
        var φ2 = marker2.lat*(Math.PI)/180;
        var Δφ = (marker2.lat-marker1.lat)*(Math.PI)/180;
        var Δλ = (marker2.lng-marker1.lng)*(Math.PI)/180;

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        console.log('distance-' + R*c);
        return Math.round(R * c*1000)/1000;
    }
}