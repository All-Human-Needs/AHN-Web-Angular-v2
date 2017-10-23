import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../../services/business.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'best-alternative-list',
  templateUrl: './best-alternative-list.component.html',
  styleUrls: ['./best-alternative-list.component.css']
})
export class BestAlternativeListComponent implements OnInit {
stats;


constructor(private businessService:BusinessService) { }

  ngOnInit() {
    this.stats=this.businessService.bestAlternatives();
  }

}
