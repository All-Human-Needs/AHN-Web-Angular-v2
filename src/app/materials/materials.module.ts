import { NgModule } from '@angular/core';
import {MdFormFieldModule, MdInputModule,MdButtonModule,MdTabsModule,MdSelectModule, MdProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule,
    MdSelectModule,
    MdProgressSpinnerModule
  ],
  exports: [
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule ,
    MdSelectModule,
    MdProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialsModule { }
