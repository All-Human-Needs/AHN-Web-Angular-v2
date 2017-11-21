import { PaginationDirective } from '../../directives/pagination.directive';

import { MaterialsModule } from '../../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerModule } from '../banner/banner.module';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from '../../app-routing.module';
import { SpreadsheetComponent } from './business-stats/stats-tabs/spreadsheet/spreadsheet.component';
import { BarChartComponent } from './business-stats/stats-tabs/bar-chart/bar-chart.component';
import { LineChartComponent } from './business-stats/stats-tabs/line-chart/line-chart.component';
import { StatsTabsComponent } from './business-stats/stats-tabs/stats-tabs.component';
import { BusinessStatsComponent } from './business-stats/business-stats.component';
import { BusinessHomeComponent } from './business-home/business-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ChartsModule,
    BannerModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule
  ], 
  declarations: [
    BusinessHomeComponent,
    BusinessStatsComponent,
    StatsTabsComponent,
    LineChartComponent,
    BarChartComponent,
    SpreadsheetComponent,
    PaginationDirective
  ]
  ,exports:[
    BusinessHomeComponent,
    BusinessStatsComponent,
  ],providers:[]
 
})
export class BusinessModule { }
