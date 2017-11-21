import { NgModule } from '@angular/core';
import {MdFormFieldModule,MdInputModule,MdButtonModule,MdTabsModule,MdTableModule ,MdPaginatorModule, } from '@angular/material';

@NgModule({
  imports: [
    MdTableModule,
    MdPaginatorModule,
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule,
 
  ],
  exports: [
    MdTableModule,
    MdPaginatorModule,
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule,
    
  ],
  declarations: []
})
export class MaterialsModule { }
