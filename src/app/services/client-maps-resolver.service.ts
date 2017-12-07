import { BusinessService } from './business.service';
import { Business } from '../models/business/business.class';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClientMapsResolver implements Resolve<Business[]> {
  constructor(private bs: BusinessService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Business[] | Observable<Business[]> | Promise<Business[]> {
    const filter = route.paramMap.get('filter');
    return this.bs.filterByCategory(filter).map(business => {
      if (business) {
        return business;
      } else {
        this.router.navigate(['/main/dashboard']);
        return null;
      }
    });
  }
}
