import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../services/business.service';

@Component({
  selector: 'app-client-maps',
  templateUrl: './client-maps.component.html',
  styleUrls: ['./client-maps.component.css']
})
export class ClientMapsComponent implements OnInit {

  constructor(private businessService:BusinessService) { }

  ngOnInit() {
  }

}
