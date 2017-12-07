import { GoogleMapsAPIWrapper } from '@agm/core';
import { Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
declare var google: any;


@Directive({
  selector: 'appMapDirections'
})
export class MapDirectionsDirective implements OnInit, OnChanges {

  @Input() origin;
  @Input() destination;
  @Input() directionsDisplay: any;
  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.gmapsApi.getNativeMap().then(map => {
      this.directionsDisplay.setMap(map);
      const directionsService = new google.maps.DirectionsService;

      directionsService.route({
        origin: { lat: this.origin.latitude, lng: this.origin.longitude },
        destination: { lat: this.destination.latitude, lng: this.destination.longitude },
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          if (this.directionsDisplay === undefined){
           this.directionsDisplay = new google.maps.DirectionsRenderer;
           this.directionsDisplay.setMap(map);
           this.directionsDisplay.setDirections(response);
           this.directionsDisplay.setOptions({
            polylineOptions: {
                        strokeWeight: 8,
                        strokeOpacity: 0.7,
                        strokeColor:  '#14CFBE'
                    },
                    suppressMarkers : true
            });
            // this.showSteps(response);
          }else{
            this.directionsDisplay.setMap(null);
            this.directionsDisplay = new google.maps.DirectionsRenderer;
            this.directionsDisplay.setMap(map);
            this.directionsDisplay.setDirections(response);
            this.directionsDisplay.setOptions({
              polylineOptions: {
                          strokeWeight: 8,
                          strokeOpacity: 0.7,
                          strokeColor:  '#14CFBE'
                      },
                      suppressMarkers : true
              });
              // this.showSteps(response);
          }

        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    });
  }

  // showSteps(directionResult) {
  //   // For each step, place a marker, and add the text to the marker's
  //   // info window. Also attach the marker to an array so we
  //   // can keep track of it and remove it when calculating new
  //   // routes.
  //   var myRoute = directionResult.routes[0].legs[0];

  //   for (var i = 0; i < myRoute.steps.length; i++) {
  //     var icon = "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=" + i + "|FF0000|000000";
  //     if (i == 0) {
  //       icon = "https://chart.googleapis.com/chart?chst=d_map_xpin_icon&chld=pin_star|car-dealer|00FFFF|FF0000";
  //     }
  //     var marker = new google.maps.Marker({
  //       position: myRoute.steps[i].start_point,
  //       // map: mapCanvas,
  //       icon: icon
  //     });
  //     // attachInstructionText(marker, myRoute.steps[i].instructions);
  //     // markerArray.push(marker);
  //   }
  //   var marker = new google.maps.Marker({
  //     position: myRoute.steps[i - 1].end_point,
  //     // map: mapCanvas,
  //     icon: "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=flag|ADDE63"
  //   });
  //   // markerArray.push(marker);

  //   // google.maps.event.trigger(markerArray[0], "click");
  // }
}
