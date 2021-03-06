// import { setInterval } from 'timers';
import { Business } from '../../models/business/business.class';
import { BusinessService } from '../../services/business.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-system',
  templateUrl: './input-system.component.html',
  styleUrls: ['./input-system.component.css']
})
export class InputSystemComponent implements OnInit {
  businesses: Business[];
  currentDate: Date;
  currentNumPeople: number;
  maxCapacity: number;
  form;
  selectedBusiness: Business;

  constructor(private _businessService: BusinessService) {

   }

  ngOnInit() {
   this._businessService.getBusinesses().subscribe(
     response => {
       this.businesses = response;
       this.selectedBusiness = this.businesses[0];
       const tempDate = new Date();
       const lastEntry = new Date(this.selectedBusiness.stats[this.selectedBusiness.stats.length - 1].date);
       if (tempDate.getFullYear() == lastEntry.getFullYear() && tempDate.getMonth() == lastEntry.getMonth() && tempDate.getDate() == lastEntry.getDate()){
        this.currentNumPeople = this.selectedBusiness.stats[this.selectedBusiness.stats.length - 1].pax;

        this.maxCapacity = this.selectedBusiness.capacity;
      }else{
        this.currentNumPeople = 0;

        this.maxCapacity = this.selectedBusiness.capacity;
       }

    }
   );
   setInterval(()=>{
     this.send()
   },30000)
   setInterval(()=>{console.log("hello")},1800000);
  }

  setSelectedBusiness(selected){
    const tempDate = new Date();
    const lastEntry = new Date(selected.stats[this.selectedBusiness.stats.length - 1].date);
    if (tempDate.getFullYear() == lastEntry.getFullYear() && tempDate.getMonth() == lastEntry.getMonth() && tempDate.getDate() == lastEntry.getDate()){
      const temp = selected.stats.length - 1;
      this.currentNumPeople = selected.stats[temp].pax;

      this.maxCapacity = this.selectedBusiness.capacity;
    }else{
     this.currentNumPeople = 0;

     this.maxCapacity = this.selectedBusiness.capacity;
    }

  }

  send(){
     this.currentDate = new Date();
     const newStat = {date: this.currentDate.toString(), pax: this.currentNumPeople};
     this.selectedBusiness.stats.push(newStat);
    this._businessService.postStatisics(this.selectedBusiness);

  }




}
