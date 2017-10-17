import { Business } from "../models/business/business.class";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class BusinessService {
  businessRef: AngularFireList<any>;
  businesses: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {

  }

  getBusinesses():any {
    this.businessRef = this.db.list("businesses");
    this.businesses = this.businessRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  //   this.businesses.forEach(element => {
  //       console.log(element);
  //   });
  }

  deleteBusiness(key?: string) {
    this.businessRef.remove(key);
  }

  addBusiness(business:Business) {
    this.businessRef.push(business);
  }

  updateBusiness(key: string, business:Business) {
    this.businessRef.update(key, business);
  }
}
