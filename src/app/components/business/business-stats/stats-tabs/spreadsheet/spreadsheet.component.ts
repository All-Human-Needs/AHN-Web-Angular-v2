import { Stats } from '../../../../../models/business/stats.class';
import { Business } from '../../../../../models/business/business.class';
import { BusinessService } from '../../../../../services/business.service';
import { Component, OnInit } from '@angular/core';
import { StatsTabsComponent } from '../stats-tabs.component';

@Component({
  selector: 'ahn-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {
  constructor(private _businessService: BusinessService,private statTabs:StatsTabsComponent) { 
    this.chartType=_businessService.getChartType();
  }

  chartType:string;
  statistics: statisics[]=[];
  selectedDate:Date;

  getHourlyStats(i:number,response:Business[],date:Date) {
    
      this.statistics.splice(0);
      this.selectedDate=new Date(date);
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

  }

  getDailyStats(i:number,response:Business[],date:Date) {
    
      this.statistics.splice(0);
  
      this.selectedDate=new Date(date);
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

  getMonthlyStats(i:number,response:Business[],date:Date) {
    
      this.statistics.splice(0);
      
      this.selectedDate=new Date(date);
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
     
  }


  ngOnInit() {

    this.statTabs.form.valueChanges.subscribe(data=>{
      this._businessService.getBusinesses().subscribe(response=>{
        switch (this.chartType) {
          case "hourly":this.getHourlyStats(0,response,data.selectedDate);
            break;
            case "daily":this.getDailyStats(0,response,data.selectedDate);
            break;
            // case "weekly":this.getWeeklyStats(0);
            // break;
            case "monthly":this.getMonthlyStats(0,response,data.selectedDate);
            break;
        
          default:
            break;
        }
      })
    })

  }

}
export interface statisics{
  date:Date;
  pax:number;
}
