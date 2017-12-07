
import { StatsTabsComponent } from '../stats-tabs.component';

import { Business } from '../../../../../models/business/business.class';
import { Stats } from './../../../../../models/business/stats.class';
import { BusinessService } from './../../../../../services/business.service';
import { Component, OnInit, } from '@angular/core';
import { AuthenticationService } from '../../../../../services/authentication.service';

@Component({
  selector: 'ahn-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private _businessService: BusinessService, private statTabs: StatsTabsComponent, private _authService: AuthenticationService) {
    this.chartType = statTabs.timePeriod;
    this.selectedDate = new Date(statTabs.datepicker.get('selectedDate').value);
   }

  //initializing barchart
  barChartData: any[]= [{data: [], label: ''}];
  barChartLabels: any[]= [];
  barChartOptions: any = {scaleShowVerticalLines: false, responsive: true, };
  barChartType = 'bar';
  barChartLegend = false;
  barChartColors: Array<any> = [{
     hoverBackgroundColor: '#27CEBE',
     backgroundColor: 'rgba(39, 206, 189, 0.459)',
   }, ];

  pax: number[] = [];
  dates: any[]= [];
  statistics: statisics[]= [];
  selectedDate: Date;
  chartType: string;


  getHourlyStats(response: Business, date: Date) {

      this.statistics.splice(0);
      this.dates.splice(0);
      this.pax.splice(0);

         //get stats of selected business
         const allStats = response.stats;
         //get selected date or get current date if there is no selected date
         if (this.selectedDate == null || this.selectedDate == undefined){
           this.selectedDate = new Date();
         }
         const selectedDay = this.selectedDate.getDate();
         const selectedMonth = this.selectedDate.getMonth();
         const selectedYear = this.selectedDate.getFullYear();
         //filter to receive stats for the selected day only
         for (let x = 0; x < allStats.length; x++) {
           //get current date in array
           const currentDate: Date = new Date(allStats[x].date);
           const currentDay = currentDate.getDate();
           const currentMonth = currentDate.getMonth();
           const currentYear = currentDate.getFullYear();
           //check if current day is equal to selected day
           if (selectedDay === currentDay && selectedMonth === currentMonth && selectedYear === currentYear){
             //create a new stats object
             const newStat: statisics = {
               date: currentDate,
               pax: allStats[x].pax,
             };
             //push the new stat to the stats array
           this.statistics.push(newStat);
           }
         }

         //sets variables to be used in bar chart
         for (let x = 0; x < this.statistics.length; x++) {
          this.pax.push(this.statistics[x].pax);
          let hours: any = this.statistics[x].date.getHours();
          let min: any = this.statistics[x].date.getMinutes();
          if (min < 10)min = '0' + min;
          if (hours < 10)hours = '0' + hours;
          const dateString: string = hours + ':' + min;
          this.dates.push(dateString);
         }

         if (this.chartType != null || this.chartType != undefined){
          this.barChartLabels = this.dates;
          this.barChartData = [{data: this.pax, label: this.chartType.toUpperCase()}];

         }

   }

   getDailyStats(response: Business, date: Date) {

      this.statistics.splice(0);
      this.dates.splice(0);
      this.pax.splice(0);

             const allStats = response.stats;
             if (this.selectedDate === null || this.selectedDate === undefined){
               this.selectedDate = new Date();
             }
             //get next 7 days starting at selected day
             const days: Date[] = this.getNextDays(this.selectedDate, 6);
             //sets next 7 days to global statistic
             for (let x = 0; x < days.length; x++) {
                this.statistics.push({date: days[x], pax: 0});

             }

             for (let x = 0; x < allStats.length; x++) {
               const currentDate: Date = new Date(allStats[x].date);
               const currentDay = currentDate.getDate();
               const currentMonth = currentDate.getMonth();
               const currentYear = currentDate.getFullYear();

                for (let j = 0; j < this.statistics.length; j++) {
                 const selDate = this.statistics[j].date;
                 const selectedDay = selDate.getDate();
                 const selectedMonth = selDate.getMonth();
                 const selectedYear = selDate.getFullYear();

                 if (selectedDay === currentDay && selectedMonth === currentMonth && selectedYear === currentYear){
                   this.statistics[j].pax += allStats[x].pax;
                 }
                }
             }

             for (let x = 0; x < this.statistics.length; x++) {
              this.pax.push(this.statistics[x].pax);
              const dayNum = this.statistics[x].date.getDay();

              const dateString: string =  this.daySelector(dayNum); //hours+":"+min;
              this.dates.push(dateString);
             }


             if (this.chartType != null || this.chartType != undefined){
              this.barChartLabels = this.dates;
              this.barChartData = [{data: this.pax, label: this.chartType.toUpperCase()}];

             }


   }


    getNextDays(startDate, daysToAdd) {
      const aryDates = [];
      for (let i = 0; i <= daysToAdd; i++) {
          const currentDate = new Date(startDate);
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

   getMonthlyStats(response: Business, date: Date) {

      this.statistics.splice(0);
      this.dates.splice(0);
      this.pax.splice(0);

         if (this.selectedDate === null || this.selectedDate === undefined){
           this.selectedDate = new Date();
         }
         //get stats of selected business
         const allStats = response.stats;
         const selectedYear = this.selectedDate.getFullYear();

         for (let j = 0; j <  12; j++) {
           this.statistics.push({date: new Date(selectedYear, j), pax: 0});
         }
         for (let x = 0; x < allStats.length; x++) {
           const currentDate: Date = new Date(allStats[x].date);
           const currentYear = currentDate.getFullYear();
           const currentMonth = currentDate.getMonth();
           for (let j = 0; j < 12; j++) {
             if (currentYear === selectedYear && currentMonth === j){
               this.statistics[j].pax += allStats[x].pax;
             }
           }
         }

         for (let x = 0; x < this.statistics.length; x++) {
          this.pax.push(this.statistics[x].pax);
          const monthNum = this.statistics[x].date.getMonth();

          const dateString: string =  this.monthSelector(monthNum); //hours+":"+min;
          this.dates.push(dateString);
         }

         if (this.chartType != null || this.chartType != undefined){
          this.barChartLabels = this.dates;
          this.barChartData = [{data: this.pax, label: this.chartType.toUpperCase()}];

         }

   }

 monthSelector(monthNum: number): string{
  let monthStr;
  switch (monthNum) {
    case 0: monthStr = 'Jan';
      break;
      case 1: monthStr = 'Feb';
      break;
      case 2: monthStr = 'Mar';
      break;
      case 3: monthStr = 'Apr';
      break;
      case 4: monthStr = 'May';
      break;
      case 5: monthStr = 'Jun';
      break;
      case 6: monthStr = 'Jul';
      break;
      case 7: monthStr = 'Aug';
      break;
      case 8: monthStr = 'Sep';
      break;
      case 9: monthStr = 'Oct';
      break;
      case 10: monthStr = 'Nov';
      break;
      case 11: monthStr = 'Dec';
      break;
    default:
      break;
  }
  return monthStr;
 }


 daySelector(dayNum: number): string{
  let dayStr;
  switch (dayNum) {
    case 0: dayStr = 'Sun';
    break;
    case 1: dayStr = 'Mon';
      break;
      case 2: dayStr = 'Tue';
      break;
      case 3: dayStr = 'Wed';
      break;
      case 4: dayStr = 'Thu';
      break;
      case 5: dayStr = 'Fri';
      break;
      case 6: dayStr = 'Sat';
      break;


    default:
      break;
  }
  return dayStr;
 }

  ngOnInit() {

    let valueChanged = false;
    // let business = this.statTabs.currentBusiness;
    const uid = this._authService.getCurrentBusiness();
     let currentBusiness;
     this._businessService.getBusinesses().subscribe(response => {


      for (let i = 0; i < response.length; i++) {
        if (response[i].id === uid){

          currentBusiness =  response[i];

        }

      }

      this.statTabs.datepicker.valueChanges.subscribe(data => {
        this.selectedDate = new Date(data.selectedDate);

        valueChanged = true;
        switch (this.chartType) {
          case 'hourly': this.getHourlyStats(currentBusiness, this.selectedDate);
            break;
            case 'daily': this.getDailyStats(currentBusiness, this.selectedDate);
            break;
            // case "weekly":this.getWeeklyStats(0);
            // break;
            case 'monthly': this.getMonthlyStats(currentBusiness, this.selectedDate);
            break;

          default:
            break;
        }
      });
      if (!valueChanged){

        switch (this.chartType) {
          case 'hourly': this.getHourlyStats(currentBusiness, this.selectedDate);
            break;
            case 'daily': this.getDailyStats(currentBusiness, this.selectedDate);
            break;
            // case "weekly":this.getWeeklyStats(0);
            // break;
            case 'monthly': this.getMonthlyStats(currentBusiness, this.selectedDate);
            break;

          default:
            break;
        }
      }
      this.statTabs.chartType.subscribe(timePeriod => {
        this.chartType = timePeriod;
        switch (this.chartType) {
          case 'hourly': this.getHourlyStats(currentBusiness, this.selectedDate);
            break;
            case 'daily': this.getDailyStats(currentBusiness, this.selectedDate);
            break;
            // case "weekly":this.getWeeklyStats(0);
            // break;
            case 'monthly': this.getMonthlyStats(currentBusiness, this.selectedDate);
            break;

          default:
            break;
        }
      });


    });

    if (this.chartType != null || this.chartType != undefined){
      this.barChartLabels = this.dates;
      this.barChartData = [{data: this.pax, label: this.chartType.toUpperCase()}];

     }

  }

}

interface statisics{
  date: Date;
  pax: number;
}

