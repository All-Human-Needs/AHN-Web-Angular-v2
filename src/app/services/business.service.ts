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
  }

  getBusinesses() {
    this.businesses.forEach(element => {
      for(let i=0;i<element.length;i++){
        console.log(element[i].lat);
      }
    });
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
