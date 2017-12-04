import { MapsService } from "./maps.service";
import { start } from "repl";
import { LatLng, LatLngLiteral } from "@agm/core";
import { MapComponent } from "../components/client/client-maps/map/map.component";
import { Observer, ReplaySubject } from "rxjs/Rx";

import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

import { Business } from "../models/business/business.class";

@Injectable()
export class BusinessService {
  businessRef: AngularFireList<Business>;
  businesses: Observable<Business[]>;
  key;

  chartType: string;
  alt: Business[] = [];

  filterKeyword: string = "hospital";

  filteredBusiness: Observable<Business[]>;

  constructor(
    private db: AngularFireDatabase,
    private mapService: MapsService
  ) {
    // console.log("service constructor");
    this.businessRef = db.list("businesses");
    // console.log(this.businessRef);
    this.businessRef.valueChanges().subscribe((changes: Business[]) => {
      this.alt = changes;
      // console.log({"changes":changes});
    });
  }

  getBusinesses(): Observable<Business[]> {
    return (this.businesses = this.businessRef
      .snapshotChanges()
      .map(changes => {
        // console.table(changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))

        // console.log(this.key[0]);
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }));
  }

  deleteBusiness(key?: string) {
    this.businessRef.remove(key);
  }

  addBusiness(business: Business) {
    this.businessRef.push(business);
  }

  updateBusiness(key: string, business: Business) {
    this.businessRef.update(key, business);
  }

  search(term: string): Observable<Business[]> {
    const list = this.alt.filter((b: Business) => {
      return b.name.search(RegExp(term, "i")) > -1;
    });

    return Observable.create((observer: Observer<Business[]>) => {
      observer.next(list);
    });
  }
  filterByCategory(term: string): Observable<Business[]> {
    // console.log({"term":term});
    // console.log({"alt":this.alt});
    const list = this.alt.filter((b: Business) => {
      return b.category.search(RegExp(term, "i")) > -1;
    });
    list
      .sort((a: Business, b: Business) => {
        var lastPaxA = a.stats[a.stats.length - 1].pax;
        var lastPaxB = b.stats[b.stats.length - 1].pax;
        if (lastPaxA < lastPaxB) {
          return -1;
        } else if (lastPaxA > lastPaxB) {
          return 1;
        } else {
          return 0;
        }
      })
      .splice(3, list.length);
    // console.log(this.mapService.setCurrentPosition());
    // this.mapService.setCurrentPosition();
   

    // list.sort((a: any, b:any ) => {
    //    if (a < b) {
    //   return -1;
    // } else if (a > b) {
    //   return 1;
    // } else {
    //   return 0;
    // }})

    // console.log(list);
    return Observable.create((observer: Observer<Business[]>) => {
      observer.next(list);
    });
  }

  postStatisics(business: Business) {
    const businesses: Observable<any> = this.db
      .list("/businesses")
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

    let flag = true;
    businesses.forEach(element => {
      if (flag) {
        for (var i = 0; i < element.length; i++) {
          if (element[i].id === business.id) {
            // console.log("Key:" + element[i].key + "\nID: " + business.id + "\n Name: " + business.name);
            this.updateBusiness(element[i].key, business);
            flag = false;
            break;
          }
        }
      }
    });
  }

  setChartType(type: string) {
    this.chartType = type;
  }

  getChartType() {
    return this.chartType;
  }

  private getcomputeDistance(latLngA: any, latLngB: any) {
    return (
      google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) /
      1000
    ).toFixed(2);
  }
}
