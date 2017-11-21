import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../../../services/business.service';
import { Business } from '../../../../../models/business/business.class';
import { StatsTabsComponent } from '../stats-tabs.component';
import { AuthenticationService } from '../../../../../services/authentication.service';

@Component({
  selector: 'ahn-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private _businessService: BusinessService,private statTabs:StatsTabsComponent,private _authService : AuthenticationService) { 
    this.chartType=_businessService.getChartType();
   }

   //initializing linechart
  public lineChartData:Array<any> = [
    {data: [], label: '',gridLines:{color:'#000',lineWidth:1}},
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {responsive: true,};
  public lineChartColors:Array<any> = [{ 
      backgroundColor: 'rgba(80,227,194,0.48)',
      borderColor: 'rgba(80,227,194,0.9)',
      pointBackgroundColor: 'rgba(80,227,194,0.48)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#fff',
    }];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

  pax:number[] = [];
  dates:any[]=[];
  statistics: statisics[]=[];
  selectedDate:Date;
  chartType:string;


 getHourlyStats(response:Business,date:Date) {
  
    this.statistics.splice(0);
    this.dates.splice(0);
    this.pax.splice(0);
   
       //get stats of selected business
       let allStats = response.stats;
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

       if(this.chartType!=null||this.chartType!=undefined){
        this.lineChartLabels =this.dates;
        this.lineChartData=[{data:this.pax,label:this.chartType.toUpperCase()}];
     
       }
    
 }

 getDailyStats(response:Business,date:Date) {
  
    this.statistics.splice(0);
    this.dates.splice(0);
    this.pax.splice(0);
   
           let allStats = response.stats;
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

           if(this.chartType!=null||this.chartType!=undefined){
            this.lineChartLabels =this.dates;
            this.lineChartData=[{data:this.pax,label:this.chartType.toUpperCase()}];
         
           }

        
 }


  getNextDays(startDate, daysToAdd) {
    var aryDates = [];
    for (var i = 0; i <= daysToAdd; i++) {
        var currentDate = new Date(startDate);
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

 getMonthlyStats(response:Business,date:Date) {
  
    this.statistics.splice(0);
    this.dates.splice(0);
    this.pax.splice(0);
  
       if(this.selectedDate===null || this.selectedDate===undefined){
         this.selectedDate = new Date();
       }
       //get stats of selected business
       let allStats = response.stats;
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
      
       if(this.chartType!=null||this.chartType!=undefined){
        this.lineChartLabels =this.dates;
        this.lineChartData=[{data:this.pax,label:this.chartType.toUpperCase()}];
     
       }
    
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
  case 0:dayStr="Sun"
  break;
  case 1:dayStr="Mon"
    break;
    case 2:dayStr="Tue"
    break;
    case 3:dayStr="Wed"
    break;
    case 4:dayStr="Thu"
    break;
    case 5:dayStr="Fri"
    break;
    case 6:dayStr="Sat"
    break;
    
   
  default:
    break;
}
return dayStr;
}
ngOnInit() {
  let valueChanged:boolean=false;
 // let business = this.statTabs.currentBusiness;
  let uid = this._authService.getCurrentBusiness();
  let currentBusiness;
  this._businessService.getBusinesses().subscribe(response=>{

    for (var i = 0; i < response.length; i++) {
      if(response[i].id === uid){
      
        currentBusiness =  response[i];
        
      }
      
    };

    this.statTabs.form.valueChanges.subscribe(data=>{
      this.selectedDate =new Date(data.selectedDate);
      
      valueChanged=true;
      switch (this.chartType) {
        case "hourly":this.getHourlyStats(currentBusiness,this.selectedDate);
          break;
          case "daily":this.getDailyStats(currentBusiness,this.selectedDate);
          break;
          // case "weekly":this.getWeeklyStats(0);
          // break;
          case "monthly":this.getMonthlyStats(currentBusiness,this.selectedDate);
          break;
      
        default:
          break;
      }
    })
    if(!valueChanged){
     
      switch (this.chartType) {
        case "hourly":this.getHourlyStats(currentBusiness,this.selectedDate);
          break;
          case "daily":this.getDailyStats(currentBusiness,this.selectedDate);
          break;
          // case "weekly":this.getWeeklyStats(0);
          // break;
          case "monthly":this.getMonthlyStats(currentBusiness,this.selectedDate);
          break;
      
        default:
          break;
      }
    }
  })
 if(this.chartType!=null||this.chartType!=undefined){
  this.lineChartLabels =this.dates;
  this.lineChartData=[{data:this.pax,label:this.chartType.toUpperCase()}];

 }

}

}

interface statisics{
  date:Date;
  pax:number;
}
