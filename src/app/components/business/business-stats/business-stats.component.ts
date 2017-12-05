import { Business } from '../../../models/business/business.class';
import { BusinessService } from '../../../services/business.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-business-stats',
  templateUrl: './business-stats.component.html',
  styleUrls: ['./business-stats.component.css']
})
export class BusinessStatsComponent implements OnInit {
  currentBusiness: Business;
  footTraffic:number = 0;
  peakTime:Date;
  mobWidth: any;


  constructor(private _authService: AuthenticationService, private _businessService: BusinessService) {
    this.mobWidth = window.screen.width;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobWidth = window.screen.width;
  }

  ngOnInit() {
   this.getcurrentBusiness();
  //  this.mobHeight = (window.screen.height) + "px";
  //  this.mobWidth = (window.screen.width) + "px";
  //    console.log(this.mobHeight);
  //    console.log(this.mobWidth)
  }

  getcurrentBusiness() {
    let uid = this._authService.getCurrentBusiness();
    this.currentBusiness;
    this._businessService.getBusinesses().subscribe(response => {

      for (var i = 0; i < response.length; i++) {
        if (response[i].id === uid) {
          this.currentBusiness = response[i];
          this.getDisplay();
          break;
        }

      };
    });

  }


  getDisplay(){
    let currDate = new Date()
    let stats =this.currentBusiness.stats
    let currStats:any[] =[];
    this.footTraffic = 0;
    for (var i = 0; i < stats.length; i++) {
      let date = new Date(stats[i].date);
      let flag:boolean = currDate.getFullYear() == date.getFullYear() && currDate.getDate()== date.getDate() && currDate.getMonth()==date.getMonth();
      if(flag){
        currStats.push(stats[i]);
        this.footTraffic+=stats[i].pax;
      
      }
    }
   
    if(currStats.length>1){
let peakPax:number = currStats[0].pax;
    for (var i = 0; i < currStats.length-1; i++) {
      if(peakPax<currStats[i+1].pax){
        peakPax = currStats[i+1].pax;
        this.peakTime = new Date(currStats[i+1].date);
      }
    }

    }else{
      this.peakTime = new Date(currStats[0].date);
    }
    
    
   
  }

}
