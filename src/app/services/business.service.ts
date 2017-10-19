import { Business } from './../models/business/business.class';

import { element } from 'protractor';

import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class BusinessService {
  businessRef: AngularFireList<any>;
  businesses: Observable<Business[]>;

  constructor(private db: AngularFireDatabase) {
    var data: Business[];
    this.businessRef = this.db.list("businesses");
    this.businesses = this.businessRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
   });
  }

  getBusinesses():Observable<Business[]> {
    return this.businesses;
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

  // getLocations() {
  //   this.businesses.forEach(element => {
  //     for (let i = 0; i < element.length; i++) {
  //       console.log('Lat'+element[i].lat);
  //       console.log('Lng'+element[i].lng);
  //     }
  //   });
  // }
}
