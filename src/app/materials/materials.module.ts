import { NgModule } from '@angular/core';

import {MdFormFieldModule, MdInputModule,MdButtonModule,MdTabsModule,MdSelectModule, MdProgressSpinnerModule} from '@angular/material';


@NgModule({
  imports: [
    MdTableModule,
    MdPaginatorModule,
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule,

    MdSelectModule,
    MdProgressSpinnerModule

  ],
  exports: [
    MdTableModule,
    MdPaginatorModule,
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
