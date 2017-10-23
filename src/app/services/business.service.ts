
import { Observer } from "rxjs/Rx";
import { Business } from "../models/business/business.class";

import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class BusinessService {

  businessRef: AngularFireList<Business>;
  businesses: Observable<Business[]>;

  constructor(private db: AngularFireDatabase) {
    this.businessRef = db.list("businesses");
    this.businesses = this.businessRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    //.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
  }

  getBusinesses(): Observable<Business[]> {
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


  search(term: string): Observable<Business[]> {
   let list = this.businesses.filter((b: Business[]) => {
      return b.name.search(RegExp(term, "i")) > -1;
    });
    
    console.log(list)
    // .map(response => response as Business[]);;
    return list
   // return
  }
}
