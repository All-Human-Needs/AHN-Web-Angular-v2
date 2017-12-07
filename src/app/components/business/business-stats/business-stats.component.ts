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
  footTraffic = 0;
  peakTime: Date;
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

  }

  getcurrentBusiness() {
    const uid = this._authService.getCurrentBusiness();
    this.currentBusiness;
    this._businessService.getBusinesses().subscribe(response => {

      for (let i = 0; i < response.length; i++) {
        if (response[i].id === uid) {
          this.currentBusiness = response[i];
          this.getDisplay();
          break;
        }

      }
    });

  }


  getDisplay(){
    const currDate = new Date();
    const stats = this.currentBusiness.stats;
    const currStats: any[] = [];
    this.footTraffic = 0;
    for (let i = 0; i < stats.length; i++) {
      const date = new Date(stats[i].date);
      const flag: boolean = currDate.getFullYear() == date.getFullYear() && currDate.getDate() == date.getDate() && currDate.getMonth() == date.getMonth();
      if (flag){
        currStats.push(stats[i]);
        this.footTraffic += stats[i].pax;

      }
    }

    if (currStats.length > 1){
let peakPax: number = currStats[0].pax;
    for (let i = 0; i < currStats.length - 1; i++) {
      if (peakPax < currStats[i + 1].pax){
        peakPax = currStats[i + 1].pax;
        this.peakTime = new Date(currStats[i + 1].date);
      }
    }

    }else{
      this.peakTime = new Date(currStats[0].date);
    }



  }

}
