import { BusinessService } from '../../../services/business.service';
import { Router } from '@angular/router';
import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-business-home',
  templateUrl: './business-home.component.html',
  styleUrls: ['./business-home.component.css']
})
export class BusinessHomeComponent implements OnInit {
//  @Output() clicked = new EventEmitter;


  constructor( private router: Router, private _businessService: BusinessService) { }

  ngOnInit() {
  }

  next(chartType: string){
    this._businessService.setChartType(chartType);
    this.router.navigateByUrl('/business-statistics');
  }

}
