import { MapsService } from './maps.service';
import { start } from 'repl';
import { LatLng, LatLngLiteral } from '@agm/core';
import { MapComponent } from '../components/client/client-maps/map/map.component';
import { Observer, ReplaySubject } from 'rxjs/Rx';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Business } from '../models/business/business.class';

@Injectable()
export class BusinessService {
  businessRef: AngularFireList<Business>;
  businesses: Observable<Business[]>;
  key;

  chartType: string;
  alt: Business[] = [];

  filterKeyword = 'hospital';

  filteredBusiness: Observable<Business[]>;

  constructor(
    private db: AngularFireDatabase,
    private mapService: MapsService
  ) {
    this.businessRef = db.list('businesses');
    this.businessRef.valueChanges().subscribe((changes: Business[]) => {
      this.alt = changes;
    });
  }

  getBusinesses(): Observable<Business[]> {
    return (this.businesses = this.businessRef
      .snapshotChanges()
      .map(changes => {

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
    list
      .sort((a: Business, b: Business) => {
        const lastPaxA = a.stats[a.stats.length - 1].pax;
        const lastPaxB = b.stats[b.stats.length - 1].pax;
        if (lastPaxA < lastPaxB) {
          return -1;
        } else if (lastPaxA > lastPaxB) {
          return 1;
        } else {
          return 0;
        }
      })
      .splice(3, list.length);

    return Observable.create((observer: Observer<Business[]>) => {
      observer.next(list);
    });
  }

  postStatisics(business: Business) {
    const businesses: Observable<any> = this.db
      .list('/businesses')
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

    let flag = true;
    businesses.forEach(element => {
      if (flag) {
        for (let i = 0; i < element.length; i++) {
          if (element[i].id === business.id) {
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
