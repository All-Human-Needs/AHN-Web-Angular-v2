import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router:Router,private ahnAuth: AngularFireAuth){}
    
    canActivate(): Observable<boolean> {
        return Observable.from(this.ahnAuth.authState)
          .take(1)
          .map(state => !!state)
          .do(authenticated => {
            if (!authenticated) {
              this.router.navigate(['/login']);
            }
          });
      }
}