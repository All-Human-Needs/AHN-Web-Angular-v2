import { SideNavModule } from './../client/client-maps/side-nav/side-nav.module';
import { AppRoutingModule } from '../../app-routing.module';
import { BannerComponent } from './banner.component';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [AppRoutingModule],
  exports: [BannerComponent],
  declarations: [BannerComponent]
})
export class BannerModule {

}
