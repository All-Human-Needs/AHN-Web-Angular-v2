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

  @Input() filteredBusiness: Business[];

  @Output()
  filteredBusinessChange: EventEmitter<Business[]> = new EventEmitter<
    Business[]
  >();

  // = {displayFiltered: 'location'};
  // emergencyBuildings = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // restaurants = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // governmentBuildings = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // shops = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // library = [{ title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    
    this.route.params.subscribe((param:Params)=>{
      console.log({"1":param['filter']})

    //  this.filterargs=new BehaviorSubject<string>(param['filter'])

      this.businessService.filterByCategory(param['filter'])
      .subscribe(business => {
        this.filteredBusiness = business;
        this.filteredBusinessChange.emit(business);
        console.log({"2":business});
      });
    })

    // this.businesses = this.filterargs
    //   // .delay(300)
    //   // .distinctUntilChanged()
    //   .switchMap(
    //     term =>
    //       term
    //         ? this.businessService.filterByCategory(term)
    //         : Observable.of<Business[]>([])
    //   )
    //   //  console.log(term);
    //   .catch(error => {
    //     console.log(error);
    //     return Observable.of<Business[]>([]);
    //   });

    // this.businesses.subscribe(business => {
    //   this.filteredBusiness = business;
    //   this.filteredBusinessChange.emit(business);
    //   // console.log("happens");
    // });

    // this.route.paramMap
    // .switchMap((params: ParamMap) => this.businessService.filterByCategory(params.get('filter')))
    // .subscribe(business => {
    //   this.filteredBusiness = business;
    //   this.filteredBusinessChange.emit(business);
    //   // console.log("happens");
    // });

    // this.businessService.filteredBusiness=this.businesses;s
  }

  search(filter: string): void {
    // this.filterargs.next(filter);
    let link = ["/main/client-maps", filter];
    this.router.navigate(link);
  }

  uncheckBoxes(){
    // WORK NEEDED
  }
}
// displayFiltered ( userpref: String) {
//    if (userpref === 'Emergency Buildings') {
//   console.log(this.emergencyBuildings);
//  } else {if (userpref === 'Restaurants') {
//    console.log(this.restaurants);
//  } else {if (userpref === 'Government Buildings') {
//    console.log(this.governmentBuildings);
//  } else {if (userpref === 'Shops') {
//   console.log(this.shops);
//  } else {if (userpref === 'Library') {
//   console.log(this.library);
//  }}

// import { PipeTransform } from "@angular/core/core";

// @Pipe({
//   name: 'filter'
// })
// export class FilterPipe implements PipeTransform {
// transform(results: any, filter: any, isAnd: boolean): any {
//   if (filter && Array.isArray(results)) {
//     const filterKeys = Object.keys(filter);
//     if (isAnd) {
//       return results.filter(building =>
//           filterKeys.reduce((memo, buildingName) =>
//               (memo && new RegExp(filter[buildingName], 'gi').test(results[buildingName])) || filter[buildingName] === "", true));
//     } else {
//       return results.filter(item => {
//         return filterKeys.some((buildingName) => {
//           console.log(buildingName);
//           return new RegExp(filter[buildingName], 'gi').test(results[buildingName]) || filter[buildingName] === "";
//         });
//       });
//     }
//   } else {
//     return results;
//   }
// }
// }
// } } } }}
