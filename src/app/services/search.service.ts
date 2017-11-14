
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Business } from '../models/business/business.class';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class SearchService {
  public business: Observable<Business>
  constructor() { }

  setBusiness(item: Business) {
    this.business=Observable.create((observer: Observer<Business>) => {
      observer.next(item);
    });
  }

  getBusiness(){
    return this.business;
  }

}
