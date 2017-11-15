import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
declare var google: any;


@Directive({
  selector: 'appMapDirections'
})
export class MapDirectionsDirective implements OnInit,OnChanges {
 
  @Input() origin;
  @Input() destination;
  // @Input() directionsDisplay;
  constructor(private gmapsApi: GoogleMapsAPIWrapper) { }

  ngOnInit() {
    // this.gmapsApi.getNativeMap().
        
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.gmapsApi.getNativeMap().then(map => {
      
      var directionsService = new google.maps.DirectionsService;
       var directionsDisplay = new google.maps.DirectionsRenderer;
      directionsDisplay.setMap(map);
      directionsService.route({
        origin: { lat: this.origin.latitude, lng: this.origin.longitude },
        destination: { lat: this.destination.latitude, lng: this.destination.longitude },
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    });
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.gmapsApi.getNativeMap().then(map => {
      
  //     var directionsService = new google.maps.DirectionsService;
  //     // var directionsDisplay = new google.maps.DirectionsRenderer;
  //     this.directionsDisplay.setMap(map);
  //     directionsService.route({
  //       origin: { lat: this.origin.latitude, lng: this.origin.longitude },
  //       destination: { lat: this.destination.latitude, lng: this.destination.longitude },
  //       waypoints: [],
  //       optimizeWaypoints: true,
  //       travelMode: 'DRIVING'
  //     }, function (response, status) {
  //       if (status === 'OK') {
  //         this.directionsDisplay.setDirections(response);
  //       } else {
  //         window.alert('Directions request failed due to ' + status);
  //       }
  //     });

  //   });
  // }
}
