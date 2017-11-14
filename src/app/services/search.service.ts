import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Business } from '../models/business/business.class';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {
  destinationBusiness = new Subject<Business>();

  public business: Observable<Business>
  constructor() { }

  setBusiness(item: Business) {
    this.business=Observable.create((observer: Observer<Business>) => {
      observer.next(item);
    });
  }

  getBusiness() :Observable<Business>{
    return this.business;
  }

}
