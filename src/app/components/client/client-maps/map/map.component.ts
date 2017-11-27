import { MapDirectionsDirective } from '../map-directions.directive';
import { SearchService } from './../../../../services/search.service';
import { Location } from 'tslint/lib/rules/strictBooleanExpressionsRule';
import { Business } from './../../../../models/business/business.class';
import { BusinessService } from './../../../../services/business.service';

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';

declare var google: any;

@Component({
  selector: 'ahn-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers:[GoogleMapsAPIWrapper]
})

export class MapComponent implements OnInit {
  @ViewChild(MapDirectionsDirective)vc:MapDirectionsDirective;
 
  origin= {
    latitude:0,
    longitude:0
  };
  destination= {
    latitude:0,
    longitude:0
  };
  locations: Business[] = []; //= this.businessService.getBusinesses();
  userLocation: location = this.setCurrentPosition();
  userLat: number;
  userLng: number;
  userName: String = "You are here";
  zoom: number;
  directionsDisplay;
  constructor(private BusinessService: BusinessService, private SearchService: SearchService,private gmapsApi: GoogleMapsAPIWrapper,private mapsAPILoader:MapsAPILoader) {

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
   
    this.SearchService.destinationBusiness.subscribe(
      response => {
        this.destination = new Destination(response.lat,response.lng)
       
        this.mapsAPILoader.load().then((map) => { 
         
          this.directionsDisplay = new google.maps.DirectionsRenderer;
         
        }
      ); 
      
       
      }

    )
   
  }

  // Method for calculating distance -- START
  // private calculateDistance(origin: location, destination: Business) {
  //   const start = new google.maps.LatLng(origin.lat, origin.lng);
  //   const end = new google.maps.LatLng(destination.lat, destination.lng);

  //   const distance = new google.maps.geometry.spherical.compeuteDistanceBetween(start, end);

  //   console.log(distance);
  // }
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
        this.origin.latitude = newMarker.lat;
        this.origin.longitude = newMarker.lng;
        console.log("Origin: "+this.origin.latitude+","+this.origin.longitude)
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
      imageLocation = "assets/img/colour-markers/red.jpg";
    }
    if ((business.stats[business.stats.length - 1].pax / business.capacity) > 0.5 && ((business.stats[business.stats.length - 1].pax / business.capacity) <= 0.8)) {
      imageLocation = "assets/img/colour-markers/orange.jpg";
    }
    if ((business.stats[business.stats.length - 1].pax / business.capacity) <= 0.5) {
      imageLocation = "assets/img/colour-markers/green.jpg";
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

class Destination{
  latitude:number;
  longitude:number;

  constructor( latitude:number,
    longitude:number){
      this.latitude = latitude;
      this.longitude = longitude;
    }
  
}
