import { Observer } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { LatLngLiteral } from '@agm/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MapsService {
  currentLocation;
  constructor() {}

   setCurrentPosition(): Observable<LatLngLiteral> {
    let userLatLng;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        userLatLng = <LatLngLiteral>{
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
this.currentLocation = {lat: userLatLng.lat, lng: userLatLng.lng};

return userLatLng;


      });

      return this.currentLocation;
    }
    // return Observable.create((observer: Observer<LatLngLiteral>) => {
    //   observer.next(this.currentLocation);
    // });

  }

  getcomputeDistance(latLngA: any , latLngB: any )
  {
    return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
  }
}
