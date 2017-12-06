import { Response } from '_debugger';

import { LatLngLiteral, LatLng } from "@agm/core";
import { MapsService } from "../../services/maps.service";
import { BehaviorSubject } from "rxjs/Rx";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Business } from "./../../models/business/business.class";
import { BusinessService } from "./../../services/business.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, ParamMap, Params, Router } from "@angular/router";
import{} from "@types/googlemaps"
@Component({
  selector: "filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent implements OnInit {
  // filterargs:BehaviorSubject<string>;
  businesses: Observable<Business[]>;

  params: string;

  @Input() filteredBusiness: Business[] = [];

  @Output()
  filteredBusinessChange: EventEmitter<Business[]> = new EventEmitter<Business[]>();

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute,
    private mapService: MapsService
  ) {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.businessService.filterByCategory(params.get("filter"));
      })
      .subscribe(business => {
        this.filteredBusiness = business;
        this.filteredBusinessChange.emit(business);
        console.log({ "2": business });

        var distanceService= new google.maps.DistanceMatrixService
var origin = new google.maps.LatLng(-33.927082399999996,18.445757);
var destination=[];
for (var i = 0; i < business.length; i++) {

destination.push(new google.maps.LatLng(business[i].lat,business[i].lng));
  
}
        distanceService.getDistanceMatrix({
          origins:[origin],
destinations:destination
        },function (response,status){

        })
        
      });

    if (this.filteredBusiness.length < 1) {
      let link = ["/main/client-maps/all"];
      router.navigate(link);
    }

    // this.businessService.replay.subscribe(lol => console.log({ here: lol }));
    // await this.businessService.replay.first().toPromise().then();
  }

  ngOnInit() {
    // calls check specific box function so the filter you choose in the dashboard is reflected in the filters list -- START
    this.route.params.subscribe((param: Params) => {
      let category = param["filter"];

      this.checkSpecificBox(category);
    });
    // calls check specific box function so the filter you choose in the dashboard is reflected in the filters list -- END
  }

  search(filter: string): void {
    // this.filterargs.next(filter);
    let link = ["/main/client-maps", filter];
    this.router.navigate(link);
  }

  hospitalChecked: boolean = false;
  policeChecked: boolean = false;
  fireDepartmentChecked: boolean = false;
  bankChecked: boolean = false;
  homeAffairsChecked: boolean = false;
  nutritionAndFitnessChecked: boolean = false;
  insuranceChecked: boolean = false;
  cityToCityChecked: boolean = false;
  MotorVehicleServiceChecked: boolean = false;
  retailChecked: boolean = false;

  checkSpecificBox(input: String) {
    switch (input) {
      case "nutrition and fitness":
        this.nutritionAndFitnessChecked = true;
        break;
      case "insurance":
        this.insuranceChecked = true;
        break;
      case "city to city":
        this.cityToCityChecked = true;
        break;
      case "motor vehicle service":
        this.MotorVehicleServiceChecked = true;
        break;
      case "retail":
        this.retailChecked = true;
        break;
      case "All":
        this.hospitalChecked = false;
        this.policeChecked = false;
        this.fireDepartmentChecked = false;
        this.bankChecked = false;
        this.homeAffairsChecked = false;
        this.nutritionAndFitnessChecked = false;
        this.insuranceChecked = false;
        this.cityToCityChecked = false;
        this.MotorVehicleServiceChecked = false;
        this.retailChecked = false;
      default:
    }
  }

  uncheckBoxes() {
    // WORK NEEDED
  }
}
