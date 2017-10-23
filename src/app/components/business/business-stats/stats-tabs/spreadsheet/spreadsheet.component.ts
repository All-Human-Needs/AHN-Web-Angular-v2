import { Stats } from '../../../../../models/business/stats.class';
import { Business } from '../../../../../models/business/business.class';
import { BusinessService } from '../../../../../services/business.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ahn-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {
 chartType:string;
  statistics: statisics[]=[];
  selectedDate:Date = new Date("2017-9-17");
  // chartType:string = "hourly";
  // chartType:string = "monthly";
  //chartType:string = "weekly";
  //chartType:string = "daily";
  constructor(private _businessService: BusinessService) { }

  getHourlyStats(i:number) {
    //get all businesses from the sesrvice
    this._businessService.getBusinesses().subscribe(
      response => {
        //get stats of selected business
        let allStats = response[i].stats;
        //get selected date or get current date if there is no selected date
        if(this.selectedDate===null || this.selectedDate===undefined){
          this.selectedDate = new Date();
        }
        let selectedDay = this.selectedDate.getDate();
        let selectedMonth = this.selectedDate.getMonth();
        let selectedYear = this.selectedDate.getFullYear();
        //filter to receive stats for the selected day only
        for (var x = 0; x < allStats.length; x++) {
          //get current date in array
          let currentDate:Date = new Date(allStats[x].date);
          let currentDay = currentDate.getDate();
          let currentMonth = currentDate.getMonth();
          let currentYear = currentDate.getFullYear();
          //check if current day is equal to selected day
          if(selectedDay===currentDay && selectedMonth===currentMonth && selectedYear===currentYear){
            //create a new stats object
            let newStat:statisics ={
              date: currentDate,
              pax: allStats[x].pax,
            }
            //push the new stat to the stats array
          this.statistics.push(newStat);
          }
        }
      })
  }

  getDailyStats(i:number){
    this._businessService.getBusinesses().subscribe(
          response=>{
            let allStats = response[i].stats;
            if(this.selectedDate===null || this.selectedDate===undefined){
              this.selectedDate = new Date();
            }
            //get next 7 days starting at selected day
            let days:Date[] = this.getNextDays(this.selectedDate,6);
            //sets next 7 days to global statistic
            for (var x = 0; x < days.length; x++) {
               this.statistics.push({date:days[x],pax:0})
              
            }

            for (var x = 0; x < allStats.length; x++) {
              let currentDate:Date = new Date(allStats[x].date);
              let currentDay = currentDate.getDate();
              let currentMonth = currentDate.getMonth();
              let currentYear = currentDate.getFullYear();

               for (var j = 0; j < this.statistics.length; j++) {
                let selDate = this.statistics[j].date;
                let selectedDay = selDate.getDate();
                let selectedMonth = selDate.getMonth();
                let selectedYear = selDate.getFullYear();
                 
                if(selectedDay===currentDay && selectedMonth===currentMonth && selectedYear===currentYear){
                  this.statistics[j].pax+=allStats[x].pax;
                }
               }
            }
            
          })
  }


   getNextDays(startDate, daysToAdd) {
    var aryDates = [];
    for (var i = 0; i <= daysToAdd; i++) {
        var currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        aryDates.push(currentDate);
    }

    return aryDates;
}

  // getWeeklyStats(i:number){
  //   this._businessService.getBusinesses().subscribe(
  //     response=>{
  //       let allStats = response[i].stats;
  //       if(this.selectedDate===null || this.selectedDate===undefined){
  //         this.selectedDate = new Date();
  //       }
  //     })
  // }

  getMonthlyStats(i:number){
    this._businessService.getBusinesses().subscribe(
      response=>{
        if(this.selectedDate===null || this.selectedDate===undefined){
          this.selectedDate = new Date();
        }
        //get stats of selected business
        let allStats = response[i].stats;
        let selectedYear = this.selectedDate.getFullYear();
        
        for (var j = 0; j <  12;j++) {
          this.statistics.push({date:new Date(selectedYear,j),pax:0});
        }
        for (var x = 0; x < allStats.length; x++) {
          let currentDate:Date = new Date(allStats[x].date); 
          let currentYear = currentDate.getFullYear();
          let currentMonth = currentDate.getMonth();
          for (var j = 0; j < 12; j++) {
            if(currentYear===selectedYear && currentMonth ===j){
              this.statistics[j].pax+=allStats[x].pax;
            }
          }
        } 
      })
  }


  ngOnInit() {
    this.chartType = this._businessService.getChartType();
    switch (this.chartType) {
      case "hourly":this.getHourlyStats(0);
        break;
        case "daily":this.getDailyStats(0);
        break;
        // case "weekly":this.getWeeklyStats(0);
        // break;
        case "monthly":this.getMonthlyStats(0);
        break;
    
      default:
        break;
    }

    
  }

}
export interface statisics{
  date:Date;
  pax:number;
}
