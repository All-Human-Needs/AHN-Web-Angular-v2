
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Business } from './../../models/business/business.class';
import { BusinessService } from './../../services/business.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterargs = new Subject<string>();
  businesses : Observable<Business[]>;
  // = {displayFiltered: 'location'};
  // emergencyBuildings = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // restaurants = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // governmentBuildings = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // shops = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  // library = [{ title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];

  constructor(private businessService: BusinessService ) { }

  ngOnInit() {
    
    this.businesses= this.filterargs
    .delay(300)
    .distinctUntilChanged()
    .switchMap(term=>term
       ? this.businessService.filterByCategory(term):Observable.of<Business[]>([]))
   .catch(error=>{
      console.log(error);
      return Observable.of<Business[]>([]);
    });


  }

  search(filter:string): void {
    this.filterargs.next(filter);

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
