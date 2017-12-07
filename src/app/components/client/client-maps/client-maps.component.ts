import { Business } from '../../../models/business/business.class';
import { Component, OnInit, OnChanges } from '@angular/core';
import { BusinessService } from '../../../services/business.service';

@Component({
  selector: 'app-client-maps',
  templateUrl: './client-maps.component.html',
  styleUrls: ['./client-maps.component.css']
})
export class ClientMapsComponent implements OnInit {
  filteredBusiness:any[];
  
  constructor(private businessService:BusinessService) { }

  ngOnInit() {
    console.log(this.filteredBusiness)
  }

  

}
