import { Business } from './../../../../models/business/business.class';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Observable, Subject } from 'rxjs/Rx';

import { BusinessService } from '../../../../services/business.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ahn-stats-tabs',
  
  templateUrl: './stats-tabs.component.html',
  styleUrls: ['./stats-tabs.component.css'],
  providers:[FormBuilder]
})
export class StatsTabsComponent implements OnInit {
 datepicker;
 selectedPane:string;
 chartType = new Subject<string>();
 timePeriod:string;
  // currentBusiness:Business;
  selDate:Date = new Date();
  constructor(private _businessService:BusinessService,private formBuilder:FormBuilder,private _authService : AuthenticationService) { 
    // _businessService.setChartType("hourly");
    // this.chartType = _businessService.chartType;
    this.selectedPane = "bargraph";
    this.datepicker = formBuilder.group({
      selectedDate:new Date()
    });

    this.chartType.next("hourly");
    this.timePeriod = "hourly"

  }

  ngOnInit() { 
    this.chartType.subscribe(timePeriod=>this.timePeriod = timePeriod)
  }
  
  setTimePeriod(timePeriod:string){
    this.chartType.next(timePeriod);
    // this.chartType = timePeriod;
    // this._businessService.setChartType(timePeriod);
  }

  getTimePeriod(){
    return this.chartType
  }


  selectPane(pane:string){
    this.selectedPane = pane;
    console.log(this.selectedPane)
  }
  

}
