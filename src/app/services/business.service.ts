import { Observer } from "rxjs/Rx";

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


  constructor(private db: AngularFireDatabase) {

    this.businessRef = db.list("businesses");

    this.businessRef.valueChanges().subscribe((changes: Business[]) => {
      this.alt = changes;
    });

  }

  getBusinesses(): Observable<Business[]> {

    return this.businesses = this.businessRef.snapshotChanges().map(changes => {
      // console.table(changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))

      // console.log(this.key[0]);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
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

    const list = this.alt.filter((b: Business) => {
      return b.name.search(RegExp(term, 'i')) > -1;
    });

    return Observable.create((observer: Observer<Business[]>) => {
      observer.next(list);
    });

  }

  filterByCategory(term: string): Observable<Business[]> {
    const list = this.alt.filter((b: Business) => {
      return b.category.search(RegExp(term, 'i')) > -1;
    });

    return Observable.create((observer: Observer<Business[]>) => {
      observer.next(list);
    });
  }

  postStatisics(business: Business) {
    const businesses: Observable<any> = this.db.list('/businesses')
      .snapshotChanges().map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      })

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

}
