import { LatLngLiteral, LatLng } from '@agm/core';
import { MapsService } from "../../services/maps.service";
import { BehaviorSubject } from "rxjs/Rx";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Business } from "./../../models/business/business.class";
import { BusinessService } from "./../../services/business.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, ParamMap, Params, Router } from "@angular/router";

@Component({
  selector: "filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent implements OnInit {
  // filterargs:BehaviorSubject<string>;
  businesses: Observable<Business[]>;

  params: string;

  @Input() filteredBusiness: Business[]=[];

  @Output()
  filteredBusinessChange: EventEmitter<Business[]> = new EventEmitter<
    Business[]
  >();

  locationDistance;
  distanceArray:any[];
  userLocation;
  // = {displayFiltered: 'location'};
  // emergencyBuildings = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // restaurants = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // governmentBuildings = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // shops = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // library = [{ title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute,
    private mapService: MapsService
  ) {
    // console.log(0);

    // this.params = this.route.snapshot.params['filter'];
    // console.log(this.params)
    // console.log(1);
    // this.businessService.filterByCategory(this.params)
    // .subscribe(business => {

    // console.log(2);
    //   this.filteredBusiness = business;
    //   this.filteredBusinessChange.emit(business);
    //   console.log({"2":business});
    //   console.log({"3":this.params});

    // });

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.businessService.filterByCategory(params.get("filter"));
      })
      .subscribe(business => {
        this.filteredBusiness = business;
        this.filteredBusinessChange.emit(business);

// var list:any[];
//         if("geolocation" in navigator){
//           navigator.geolocation.getCurrentPosition(position=>{
//             for (var i = 0; i < business.length; i++) {
//           console.log(business)
//               list.push({business:business[i],distance:0})
              
//             }
           
//           }
//           )
//         }

        // console.log({ "2": business });
    //     this.filteredBusiness.sort((a: any, b:any ) => {
    //    if (a < b) {
    //   return -1;
    // } else if (a > b) {
    //   return 1;
    // } else {
    //   return 0;
    // }})
        // console.log("happens");
      });

    if (this.filteredBusiness.length < 1) {
      let link = ["/main/client-maps"];
      router.navigate(link);
    }
    // this.businessService.replay.subscribe(lol => console.log({ here: lol }));

    // await this.businessService.replay.first().toPromise().then();
  }

  ngOnInit() {

  }

  search(filter: string): void {
    // this.filterargs.next(filter);
    let link = ["/main/client-maps", filter];
    this.router.navigate(link);
  }
}
