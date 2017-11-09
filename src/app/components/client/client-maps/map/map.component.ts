import { Business } from '../../../../models/business/business.class';
import { BusinessService } from './../../../../services/business.service';

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ahn-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  origin = { longitude: 18.46171849, latitude: -33.9217137 };  // its a example aleatory position
  destination = { longitude: 18.4632473, latitude: -33.9423756 };  // its a example aleatory position


  locations: Business[] = []; //= this.businessService.getBusinesses();
  userLocation: location = this.setCurrentPosition();
  userLat: number;
  userLng: number;
  userName: String = "You are here";
  zoom: number;

  constructor(private businessService: BusinessService) {
  }

  ngOnInit() {
    // Populate array of bussinesses to work with -- START
    this.businessService.getBusinesses().subscribe(
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
