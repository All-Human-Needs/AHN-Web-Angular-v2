import { SearchService } from './../../../../services/search.service';
import { Location } from 'tslint/lib/rules/strictBooleanExpressionsRule';
import { google } from '@agm/core/services/google-maps-types';
import { Business } from './../../../../models/business/business.class';
import { BusinessService } from './../../../../services/business.service';

import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'ahn-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  // @Input('userLocation') origin: Location;
  // @Input('destination') destination: number[] = [2];
  origin: number[] = [];
  destination: number[] = [];
  // origin = { longitude: 18.46171849, latitude: -33.9217137 };  // its a example aleatory position
  // destination = { longitude: 18.4632473, latitude: -33.9423756 };  // its a example aleatory position
  locations: Business[] = []; //= this.businessService.getBusinesses();
  userLocation: location = this.setCurrentPosition();
  userLat: number;
  userLng: number;
  userName: String = "You are here";
  zoom: number;
  dest: Business;

  constructor(private BusinessService: BusinessService, private SearchService: SearchService) {

  }

  ngOnInit() {
    // Populate array of bussinesses to work with -- START
    this.BusinessService.getBusinesses().subscribe(
      response => {
        for (var i = 0; i < response.length; i++) {
          var marker: Business = {
            id: response[i].id,
            name: response[i].name,
            lat: response[i].lat,
            lng: response[i].lng,
            category: response[i].category,
            capacity: response[i].capacity,
            isActive: response[i].isActive,
            stats: response[i].stats,
          }
          this.locations.push(marker);
        }
      }
    )
    // Populate array of bussinesses to work with -- END

    this.setDestination();
  }

  setDestination(){
    var dest: number[] = [];
    this.SearchService.destinationBusiness.subscribe(
      response => {
        dest[0] = response.lat;
        dest[1] = response.lng;
        this.destination[0] = response.lat;
        this.destination[1] - response.lng;
        console.log(this.destination);
      }
    )
    this.destination = dest;
    console.log(this.destination);
  }

  // Method for calculating distance -- START
  private calculateDistance(origin: location, destination: Business) {
    const start = new google.maps.LatLng(origin.lat, origin.lng);
    const end = new google.maps.LatLng(destination.lat, destination.lng);

    const distance = new google.maps.geometry.spherical.compeuteDistanceBetween(start, end);

    console.log(distance);
  }
  // Method for calculating distance -- END

 

  // Method for setting CURRENT POSITION -- START
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
        this.origin[0] = newMarker.lat;
        this.origin[1] = newMarker.lng;
      });
    }
    return this.userLocation;
  }
  // Method for setting CURRENT POSITION -- END

  // custom styles for removing all the markers that aren't ours -- START
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
  // custom styles for removing all the markers that aren't ours -- END

  // Method for displaying the correct colour for the markers START
  private getColorIcon(business: Business): String {
    let imageLocation: String = "";

    if ((business.stats[business.stats.length - 1].pax / business.capacity) > 0.8) {
      imageLocation = "assets/img/red.jpg";
    }
    if ((business.stats[business.stats.length - 1].pax / business.capacity) > 0.5 && ((business.stats[business.stats.length - 1].pax / business.capacity) <= 0.8)) {
      imageLocation = "assets/img/orange.jpg";
    }
    if ((business.stats[business.stats.length - 1].pax / business.capacity) <= 0.5) {
      imageLocation = "assets/img/green.jpg";
    }
    return imageLocation;
  }
  // Method for displaying the correct colour for the markers END
}

interface location {
  lat: number;
  lng: number;
  name: string;
}
