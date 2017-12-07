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
  AmIBusiness: boolean;

  constructor(
    private ahnAuth: AngularFireAuth,
    private router: Router,
    private _businessService: BusinessService,
    private _userService: UserService
  ) {
    this.setIsBusiness();
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
      //  this.isBusiness(user);
        this.setIsBusiness();
        this.router.navigate(["/main/dashboard"]);
      });
  }

  googleLogin(): void {
    //validate login
    this.ahnAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(user => {
        this.isClient();
        this.setIsBusiness();
        this.router.navigate(["/main/dashboard"]);
      });
    //go to next page
  }

  logout() {
    this.ahnAuth.auth.signOut();
    this.router.navigate(["/login"]);
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
          // this.router.navigateByUrl("/business-statistics");
          this.setIsBusiness();
          this.router.navigate(["/main/dashboard"]);
        } else {
          // this.router.navigateByUrl("/client-home");
          this.setIsBusiness();
          this.router.navigate(["/main/dashboard"]);
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

    return this.ahnAuth.auth.currentUser.uid;


  }

  verifyEmail() {
    this.ahnAuth.auth.currentUser
      .sendEmailVerification()
      .then(msg => alert("Password Successfully Reset"))
      .catch(msg => alert("Password Successfully Reset"));
  }

  resetPassword(email: string) {
   this.ahnAuth.auth
     .sendPasswordResetEmail(email)
      .then(()=>{
        alert("Email to reset password was sent");
        this.router.navigate(["/login"]);
      }).catch(
        err=>alert(err)
      )

  }

  isBusiness(currentUser) {
    this._userService.users.subscribe(
      (response:User[]) => {
        for (var i = 0; i < response.length; i++) {
          if (response[i].id === currentUser.uid) {
            if (response[i].isBusiness) {

              this.router.navigate(["/main/business-statistics"]);

            } else {
              this.router.navigate(["/main/client-home"]);
            }
          }
        }
      }
    
    );
  }

  isClient(){
    this._userService.users.subscribe((response:User[])=>{
      let found = false;
      for (var i = 0; i < response.length; i++) {
        if (response[i].id === this.ahnAuth.auth.currentUser.uid) {
         found=true;
         break;
        }
      }
      if(!found){
        let user: User = {
          id: this.ahnAuth.auth.currentUser.uid,
          isBusiness: false
        };
        this._userService.addItem(user);
      }
      }
    )
  }
  
  setIsBusiness() {
    this._userService.users.subscribe(
      (response:User[]) => {
        for (var i = 0; i < response.length; i++) {
          if (response[i].id === this.ahnAuth.auth.currentUser.uid) {
            this.AmIBusiness = response[i].isBusiness;
          }
        }
      });
  }
}
