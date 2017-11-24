import { AppRoutingModule } from './../../../../app-routing.module';
import { SideNavComponent } from './side-nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZippyComponent } from './zippy/zippy.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
  
  ],
  declarations: [  SideNavComponent,ZippyComponent],
  exports:[SideNavComponent]
})
export class SideNavModule { }
