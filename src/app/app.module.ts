import { SideNavModule } from './components/side-nav/side-nav.module';

//import modules
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { BusinessService } from './services/business.service';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
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
// import { BannerComponent } from './components/banner/banner.component';
import { LoginComponent } from './components/login/login.component';



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
    
  ],
  exports: [],
  providers: [BusinessService],
  bootstrap: [AppComponent]
})
export class AppModule {}
