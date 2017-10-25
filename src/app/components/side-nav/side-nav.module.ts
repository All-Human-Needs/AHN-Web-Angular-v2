import { AppRoutingModule } from './../../app-routing.module';
import { SideNavComponent } from './side-nav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
  
  ],
  declarations: [  SideNavComponent],
  exports:[SideNavComponent]
})
export class SideNavModule { }
