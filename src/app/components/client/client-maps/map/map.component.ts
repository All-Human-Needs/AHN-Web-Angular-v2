import { Business } from '../../../../models/business/business.class';
import { BusinessService } from './../../../../services/business.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ahn-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  locations: Business[] = []; //= this.businessService.getBusinesses();
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
      response => {
        for (var i = 0; i < response.length; i++) {
          var marker: Business = {
            // lat: parseFloat(response[i].lat),
            // lng: parseFloat(response[i].lng),
            // name: response[i].name,
            id: response[i].id,
            name: response[i].name,
            lat: response[i].lat,
            lng: response[i].lng,
            capacity: response[i].capacity,
            isActive: response[i].isActive,
            stats: response[i].stats,
          }
          this.locations.push(marker);
        }
      }
    )
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
        this.userLat = newMarker.lat;
        this.userLng = newMarker.lng;
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
