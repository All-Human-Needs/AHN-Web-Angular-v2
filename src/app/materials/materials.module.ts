import { NgModule } from '@angular/core';
import {MdFormFieldModule, MdInputModule,MdButtonModule,MdTabsModule,MdSelectModule} from '@angular/material';

@NgModule({
  imports: [
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule,
    MdSelectModule,
    
  ],
  exports: [
    MdFormFieldModule,
    MdInputModule,
    MdButtonModule,
    MdTabsModule ,
    MdSelectModule,
    
  ],
  declarations: []
})
export class MaterialsModule { }
