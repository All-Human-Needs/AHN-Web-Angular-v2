import { NgModule } from '@angular/core';

import {MdFormFieldModule, MdInputModule,MdButtonModule,MdTabsModule,MdSelectModule, MdProgressSpinnerModule,MdIconModule} from '@angular/material';


@NgModule({
  imports: [
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule,
    MdIconModule,
    MdSelectModule,
    MdProgressSpinnerModule

  ],
  exports: [
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule ,
    MdSelectModule,
    MdProgressSpinnerModule,
    MdIconModule
  ],
  declarations: []
})
export class MaterialsModule { }
