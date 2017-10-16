//import modules

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//custom modules
import { BannerModule } from './components/banner/banner.module';
import { BusinessModule } from './components/business/business.module';
import { ClientModule } from './components/client/client.module';
//components
import { AppComponent } from './app.component';
// import { BannerComponent } from './components/banner/banner.component';
import { LoginComponent } from './components/login/login.component';



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
    BannerModule
  ],exports:[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
