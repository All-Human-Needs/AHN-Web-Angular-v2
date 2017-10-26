import { Observable } from 'rxjs/Rx';

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
 form;

  selDate:Date;
  constructor(private _businessService:BusinessService,private formBuilder:FormBuilder) { 
    this.form = formBuilder.group({
      selectedDate:new Date()
    })
    
  }

  ngOnInit() {
  }


}
