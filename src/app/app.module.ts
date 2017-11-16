import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { SideNavModule } from './components/side-nav/side-nav.module';

//import modules
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { BusinessService } from './services/business.service';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// custom modules

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BannerModule } from './components/banner/banner.module';
import { BusinessModule } from './components/business/business.module';
import { ClientModule } from './components/client/client.module';
// components
import { AppComponent } from './app.component';
import { InputSystemComponent } from './components/input-system/input-system.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { SearchService } from './services/search.service';
import { PaginationDirective } from './directives/pagination.directive';





export const firebaseConfig = {
  apiKey: 'AIzaSyCmLj-8NEWba6GUprGUkaM4e40hfLymQK4',
  authDomain: 'all-human-needs.firebaseapp.com',
  databaseURL: 'https://all-human-needs.firebaseio.com',
  projectId: 'all-human-needs',
  storageBucket: 'all-human-needs.appspot.com',
  messagingSenderId: '376651603679'
};

@NgModule({
  declarations: [
    AppComponent,
    // BannerComponent,
    LoginComponent,
    InputSystemComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    PaginationDirective,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ClientModule,
    BusinessModule,
    BannerModule,
    SideNavModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCP2Hh22RK96_fPIFSgIcBZ-_E48-yY4P0',
    //   libraries:["places"]
    // }),
   
  ],
  exports: [],
  providers: [BusinessService,AuthenticationService,UserService,SearchService],
  bootstrap: [AppComponent]

})
export class AppModule {}
