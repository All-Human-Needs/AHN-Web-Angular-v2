import { NgModule } from '@angular/core';
import {MdFormFieldModule,MdInputModule,MdButtonModule,MdTabsModule} from '@angular/material';

@NgModule({
  imports: [
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule
  ],
  exports: [
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule 
  ],
  declarations: []
})
export class MaterialsModule { }
