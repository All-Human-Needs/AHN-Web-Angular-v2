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
  providers: [FormBuilder]
})
export class StatsTabsComponent implements OnInit {
  datepicker;
  selectedPane: string;
  chartType = new Subject<string>();
  timePeriod: string;

  selDate: Date = new Date();
  constructor(private _businessService: BusinessService, private formBuilder: FormBuilder, private _authService: AuthenticationService) {

    this.selectedPane = "bargraph";
    this.datepicker = formBuilder.group({
      selectedDate: new Date()
    });

    this.chartType.next("hourly");
    this.timePeriod = "hourly"

  }

  ngOnInit() {
    this.chartType.subscribe(timePeriod => this.timePeriod = timePeriod)
  }

  setTimePeriod(timePeriod: string) {
    this.chartType.next(timePeriod);

  }

  getTimePeriod() {
    return this.chartType
  }


  selectPane(pane: string) {
    this.selectedPane = pane;

  }


}
