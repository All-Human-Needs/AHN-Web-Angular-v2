import { SideNavModule } from './../side-nav/side-nav.module';
import { AppRoutingModule } from '../../app-routing.module';
import { BannerComponent } from './banner.component';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    AppRoutingModule,
    SideNavModule
  ],
  exports:[BannerComponent]
  ,
  declarations: [BannerComponent]
})
export class BannerModule { }
