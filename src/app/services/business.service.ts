import { Observer } from "rxjs/Rx";
import { Business } from "../models/business/business.class";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable()
export class BusinessService {
  businessRef: AngularFireList<Business>;
  businesses: Business[];

  constructor(private db: AngularFireDatabase) {
    this.businessRef = db.list("businesses");
    this.businessRef.valueChanges().subscribe((changes: Business[]) => {
      this.businesses = changes;
    });

    //.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
  }

  getBusinesses(): Observable<Business[]> {
    return Observable.create((observer: Observer<Business[]>) => {
      observer.next(this.businesses);
    });
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
    const list = this.businesses.filter((b: Business) => {
      return b.name.search(RegExp(term, "i")) > -1;
    });

    // .map(response => response as Business[]);;
    return Observable.create((observer: Observer<Business[]>) => {
      observer.next(list);
    });
  }
}
