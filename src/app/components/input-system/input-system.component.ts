import { Business } from '../../models/business/business.class';
import { BusinessService } from '../../services/business.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-system',
  templateUrl: './input-system.component.html',
  styleUrls: ['./input-system.component.css']
})
export class InputSystemComponent implements OnInit {
  businesses:Business[];
  currentDate:Date;
  currentNumPeople:number;
  maxCapacity:number;
  form;
  selectedBusiness:Business;

  constructor(private _businessService:BusinessService) {
    
   }

  ngOnInit() {
   this._businessService.getBusinesses().subscribe(
     response=>{
       this.businesses=response;
       this.selectedBusiness = this.businesses[0]
       let tempDate = new Date();
       let lastEntry = new Date(this.selectedBusiness.stats[this.selectedBusiness.stats.length-1].date);
       if(tempDate.getFullYear()==lastEntry.getFullYear()&&tempDate.getMonth()==lastEntry.getMonth()&&tempDate.getDate()==lastEntry.getDate()){
        this.currentNumPeople = this.selectedBusiness.stats[this.selectedBusiness.stats.length-1].pax
       }else{
        this.currentNumPeople = 0;
       }
       
    }
   )
  }

  setSelectedBusiness(selected){
    let tempDate = new Date();
    let lastEntry = new Date(selected.stats[this.selectedBusiness.stats.length-1].date);
    if(tempDate.getFullYear()==lastEntry.getFullYear()&&tempDate.getMonth()==lastEntry.getMonth()&&tempDate.getDate()==lastEntry.getDate()){
      var temp = selected.stats.length-1;
      this.currentNumPeople = selected.stats[temp].pax;
    }else{
     this.currentNumPeople = 0;
    }
   
  }

  send(key){
    this.currentDate=new Date();
    // if(this.currentDate.getMinutes()==0||this.currentDate.getMinutes()==30){
    //   var newStat = {date:this.currentDate.toString(),pax:this.currentNumPeople};
    //   this.selectedBusiness.stats.push(newStat);
    //   this._businessService.updateBusiness(key,this.selectedBusiness);
    // }else{
    //   alert("Its not time to post data yet")
    // }
    var newStat = {date:this.currentDate.toString(),pax:this.currentNumPeople};
    console.log("Key : "+key);
    console.table(this.selectedBusiness)
    this.selectedBusiness.stats.push(newStat);
    this._businessService.updateBusiness(key,this.selectedBusiness);
    
  }

}
