import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";

@Injectable()
export class AuthenticationService {
  authState: any = null;

  constructor(private ahnAuth: AngularFireAuth, private router: Router) {
    this.ahnAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  //Returns true when user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  //returns current data of user
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.ahnAuth.authState;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : "";
  }

  login(email: string, password: string) {
    return this.ahnAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.router.navigateByUrl("/client-home");
      })

  }

  googleLogin(): void {
    //validate login
    this.ahnAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(user => {
        this.router.navigateByUrl("/client-home");
      });
    //go to next page
  }

  logout() {
    this.ahnAuth.auth.signOut();
    this.router.navigate(["/"]);
  }
}
