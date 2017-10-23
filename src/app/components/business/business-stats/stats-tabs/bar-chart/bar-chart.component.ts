import { Stats } from './../../../../../models/business/stats.class';
import { BusinessService } from './../../../../../services/business.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ahn-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  
  barChartData:any[]=[{data:[],label:''}]; 
  barChartLabels:any[]=[]; 
  barChartOptions:any = {scaleShowVerticalLines: false,responsive: true,};
  barChartType:string = 'bar';
  barChartLegend:boolean = true;
  barChartColors:Array<any> = [{ 
     hoverBackgroundColor:'#fff',
     backgroundColor:'#000',
   },];

   
    pax:number[] = [];
    dates:any[]=[];

   statistics: statisics[]=[];
   selectedDate:Date = new Date("2017-9-17");
  //  chartType:string = "hourly";
  //  chartType:string = "monthly";
   //chartType:string = "weekly";
   chartType:string = "daily";
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

         //sets variables to be used in bar chart
         for (var x = 0; x < this.statistics.length; x++) {
          this.pax.push(this.statistics[x].pax)
          let hours:any = this.statistics[x].date.getHours();
          let min:any = this.statistics[x].date.getMinutes();
          if(min<10)min='0'+min;
          if(hours<10)hours='0'+hours;
          let dateString:string = hours+":"+min;
          this.dates.push(dateString)
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
             
             for (var x = 0; x < this.statistics.length; x++) {
              this.pax.push(this.statistics[x].pax)
              var dayNum = this.statistics[x].date.getDay()
             
              let dateString:string =  this.daySelector(dayNum);//hours+":"+min;
              this.dates.push(dateString)
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

         for (var x = 0; x < this.statistics.length; x++) {
          this.pax.push(this.statistics[x].pax)
          var monthNum = this.statistics[x].date.getMonth()
         
          let dateString:string =  this.monthSelector(monthNum);//hours+":"+min;
          this.dates.push(dateString)
         }
        
      
       })
   }

 monthSelector(monthNum:number):string{
  var monthStr;
  switch (monthNum) {
    case 0:monthStr="Jan"
      break;
      case 1:monthStr="Feb"
      break;
      case 2:monthStr="Mar"
      break;
      case 3:monthStr="Apr"
      break;
      case 4:monthStr="May"
      break;
      case 5:monthStr="Jun"
      break;
      case 6:monthStr="Jul"
      break;
      case 7:monthStr="Aug"
      break;
      case 8:monthStr="Sep"
      break;
      case 9:monthStr="Oct"
      break;
      case 10:monthStr="Nov"
      break;
      case 11:monthStr="Dec"
      break;
    default:
      break;
  }
  return monthStr;
 }


 daySelector(dayNum:number):string{
  var dayStr;
  switch (dayNum) {
    case 0:dayStr="Mon"
      break;
      case 1:dayStr="Tue"
      break;
      case 2:dayStr="Wed"
      break;
      case 3:dayStr="Thu"
      break;
      case 4:dayStr="Fri"
      break;
      case 5:dayStr="Sat"
      break;
      case 6:dayStr="Sun"
      break;
     
    default:
      break;
  }
  return dayStr;
 }
  ngOnInit() {

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

    
   

    this.barChartLabels =this.dates;
    this.barChartData=[{data:this.pax,label:this.chartType.toUpperCase()}];

    // console.log( this.barChartLabels)
    // console.log(this.barChartData)
  }
}

interface statisics{
  date:Date;
  pax:number;
}

