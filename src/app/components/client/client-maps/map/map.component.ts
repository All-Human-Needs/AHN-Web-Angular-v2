import { Business } from '../../../../models/business/business.class';
import { BusinessService } from './../../../../services/business.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ahn-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  locations: Business[]; //= this.businessService.getBusinesses();
  userLocation: location = this.setCurrentPosition();
  userLat: number;
  userLng: number;
  userName: String = "You are here";
  zoom: number;

  constructor(private businessService: BusinessService) {
  }

  ngOnInit() {
    // this.setCurrentPosition();
    // this.getBusinessMarkers();
    // this.businessService.getLocations();

    // this.getMapMarkers();
    this.businessService.getBusinesses().subscribe(
      response=>{
        this.locations = response
        console.table(response);
      }
    )
    console.log(this.locations[1].capacity);
  }

  private getMapMarkers() {
    // this.locations = this.businessService.getBusinesses();

    // console.log(this.locations[1].capacity);
  }

  private setCurrentPosition() {
    var newMarker: location;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        newMarker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          name: "You Are Here",
        }

        // this.userLocation = {
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude,
        //   name: "You Are Here",
        // }

        this.userLat = newMarker.lat;
        this.userLng = newMarker.lng;
        // this.locations.push(this.userLocation);
      });
    }

    return this.userLocation;

  }

  // custom styles for removing all the markers that aren't ours
  customStyle = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ];

}

interface location {
  lat: number;
  lng: number;
  name: string;
}
