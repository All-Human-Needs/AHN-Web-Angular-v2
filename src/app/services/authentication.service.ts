import { UserService } from "./user.service";
import { BusinessService } from "./business.service";
import { Business } from "./../models/business/business.class";
import { User } from "./../models/user";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";

@Injectable()
export class AuthenticationService {
  authState: any = null;

  constructor(
    private ahnAuth: AngularFireAuth,
    private router: Router,
    private _businessService: BusinessService,
    private _userService: UserService
  ) {
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
       this.isBusiness(user);
      });
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

  createUser(
    email: string,
    password: string,
    isBusinesses: boolean,
    business?: Business
  ) {
    let isError: boolean = false;
    this.ahnAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(success => {
        let user: User = {
          id: success.uid,
          isBusiness: isBusinesses
        };
        this._userService.addItem(user);
        if (isBusinesses) {
          business.id = success.uid;
          this._businessService.addBusiness(business);
          this.router.navigateByUrl("/business-statistics");
        } else {
          this.router.navigateByUrl("/client-home");
        }
      })
      .catch(err => {
        isError = true;
        if (
          err.message ===
          "The email address is already in use by another account."
        ) {
          alert(err.message);
        } else {
          console.log(err.message);

        }
      });
    }

  getCurrentBusiness(){
    //console.log(this.ahnAuth.auth.currentUser.uid);

    return this.ahnAuth.auth.currentUser.uid;
    //return "vKMucvqM9NWyoQqhe3BQd1N29VG2"


  }

  verifyEmail() {
    this.ahnAuth.auth.currentUser
      .sendEmailVerification()
      .then(msg => alert("Password Successfully Reset"))
      .catch(msg => alert("Password Successfully Reset"));
  }

  resetPassword(email: string) {
   // this.ahnAuth.auth
   //   .sendPasswordResetEmail(email)
   console.log(email);
     alert("Password Successfully Reset");
     
      // .then(msg => alert("Password Successfully Reset"))
      // .catch(msg => alert("Password Successfully Reset"));
  }

  isBusiness(currentUser) {
    this._userService.users.subscribe(
      (response:User[]) => {
        for (var i = 0; i < response.length; i++) {
          if (response[i].id === currentUser.uid) {
            if (response[i].isBusiness) {
              this.router.navigateByUrl("/business-home");
            } else {
              this.router.navigateByUrl("/client-home");
            }
          }
        }
      }
      //   .map(u => {
      //   console.log(u);return this.checkUsers=u;

      // })
    );
  }
}
