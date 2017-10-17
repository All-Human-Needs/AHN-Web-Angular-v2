import { Business } from "../models/business/business.class";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class BusinessService {
  businessRef: AngularFireList<any>;
  businesses: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.businessRef = db.list("businesses");
    this.businesses = this.businessRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getBusinesses() {
    this.businesses.forEach(element => {
      console.log(element);
    });
  }

  deleteBusiness(key?: string) {
    this.businessRef.remove(key);
  }

  addBusiness() {
    this.businessRef.push({ name: "ALKJSfdlkjf" });
  }

  updateBusiness(key?: string) {
    this.businessRef.update(key, { name: "FNB" });
  }
}
