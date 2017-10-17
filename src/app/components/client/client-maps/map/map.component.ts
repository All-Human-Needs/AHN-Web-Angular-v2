import { BusinessService } from './../../../../services/business.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ahn-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private businessService:BusinessService) { 
 
  }
  
    ngOnInit() {
      this.setCurrentPosition();
    }
  
    

  locations:location[]=[];
  userLocation:location;
  userLat:number;
  userLng:number;
  zoom;

  private setCurrentPosition() {
    var newMarker:location;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
      newMarker = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        name:"You Are Here",
       }
       this.userLat=newMarker.lat;
       this.userLng=newMarker.lng;
       this.locations.push(newMarker);
      });
    }
  }

getLocations(){
this.locations=this.businessService.getBusinesses()}

// custom styles for removing all the markers that aren't ours
customStyle = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{visibility:"off" }]
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [{visibility:"off" }]
  }
];

}

interface location{
  lat:number;
  lng:number;
  name:string;
}
