

import { Observer } from 'rxjs/Rx';

import { Business } from '../models/business/business.class';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class BusinessService {

  businessRef: AngularFireList<Business>;
  businesses: Observable<Business[]>;

   alt: Business[];
  constructor(private db: AngularFireDatabase) {

    this.businessRef = db.list('businesses');
    this.businessRef.valueChanges().subscribe((changes: Business[]) => {
      this.alt = changes;

    });

  }

  getBusinesses(): Observable<Business[]> {

    return this.businesses = this.businessRef.snapshotChanges().map(changes => {
       return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
     });
    // Observable.create((observer: Observer<Business[]>) => {
    //   observer.next(this.alt);
    // });
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

  bestAlternatives(): Observable<Business[]> {
    console.log(
      this.businessRef.valueChanges().forEach(element => {
        for (let i = 0; i < element.length; i++) {
          console.log(element[i]);
        }
      })
    );
    const altList = this.alt.filter((b: Business) => {
      return b.stats[b.stats.length - 1];
    });

    return Observable.create((observer: Observer<Business[]>) => {
      observer.next(altList);
    });
  }
}
