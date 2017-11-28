
import { SideNavModule } from './client-maps/side-nav/side-nav.module';
import { FilterModule } from './../filter/filter.module';

import { NgModule } from '@angular/core';

import { BannerModule } from '../banner/banner.module';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { AgmCoreModule } from '@agm/core';
import { SearchBarComponent } from './client-maps/search-bar/search-bar.component';
import { MapComponent } from './client-maps/map/map.component';
import { ClientMapsComponent } from './client-maps/client-maps.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { BestAlternativeListComponent } from './client-maps/best-alternative-list/best-alternative-list.component';
import { MapDirectionsDirective } from './client-maps/map-directions.directive';


@NgModule({
  imports: [BrowserModule,
    FormsModule,
    FilterModule,
    SideNavModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCP2Hh22RK96_fPIFSgIcBZ-_E48-yY4P0',  
      libraries:["places"]
    }),
    AppRoutingModule,
    BannerModule
  ],
  declarations: [
    ClientHomeComponent,
    ClientMapsComponent,
    MapComponent,
    MapDirectionsDirective,
    SearchBarComponent,
    BestAlternativeListComponent

  ],
  exports: [
    ClientHomeComponent,
    ClientMapsComponent,

  ],
})
export class ClientModule { }
