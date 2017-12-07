import { Observable } from 'rxjs';
import { Stats } from '../../../../../models/business/stats.class';
import { Business } from '../../../../../models/business/business.class';
import { BusinessService } from '../../../../../services/business.service';
import { Component, OnInit } from '@angular/core';
import { StatsTabsComponent } from '../stats-tabs.component';
import { AuthenticationService } from '../../../../../services/authentication.service';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'ahn-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {
  constructor(private _businessService: BusinessService, private statTabs: StatsTabsComponent, private _authService: AuthenticationService) {
    this.chartType = statTabs.timePeriod;
    this.selectedDate = new Date(statTabs.datepicker.get('selectedDate').value);
  }
  chartType: string;
  statistics: statisics[] = [];
  selectedDate: Date;

  //pagination start
  itemsPerpage = 3;
  selectedPage = 1;

  get items(): statisics[] {
    const pageIndex = (this.selectedPage - 1) * this.itemsPerpage;
    return this.statistics.slice(pageIndex, pageIndex + this.itemsPerpage);
  }
  changePage(newPage: number) {
    this.selectedPage = newPage;
  }
  changePageSize(newSize: number) {
    this.itemsPerpage = Number(newSize);
    this.changePage(1);
  }
  get pageCount(): number {
    return Math.ceil(this.statistics.length / this.itemsPerpage);
  }
  //pagination end

  getHourlyStats(response: Business, date: Date) {

    this.statistics.splice(0);
    //get stats of selected business
    const allStats = response.stats;
    //get selected date or get current date if there is no selected date
    if (this.selectedDate === null || this.selectedDate === undefined) {
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
      if (selectedDay === currentDay && selectedMonth === currentMonth && selectedYear === currentYear) {
        //create a new stats object
        const newStat: statisics = {
          date: currentDate,
          pax: allStats[x].pax,
        };
        //push the new stat to the stats array
        this.statistics.push(newStat);
      }
    }

  }

  getDailyStats(response: Business, date: Date) {

    this.statistics.splice(0);

    const allStats = response.stats;
    if (this.selectedDate === null || this.selectedDate === undefined) {
      this.selectedDate = new Date();
    }
    //get next 7 days starting at selected day
    const days: Date[] = this.getNextDays(this.selectedDate, 6);

    //sets next 7 days to global statistic
    for (let x = 0; x < days.length; x++) {
      this.statistics.push({ date: days[x], pax: 0 });
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

        if (selectedDay === currentDay && selectedMonth === currentMonth && selectedYear === currentYear) {
          this.statistics[j].pax += allStats[x].pax;
        }
      }
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

    if (this.selectedDate === null || this.selectedDate === undefined) {
      this.selectedDate = new Date();
    }
    //get stats of selected business
    const allStats = response.stats;
    const selectedYear = this.selectedDate.getFullYear();

    for (let j = 0; j < 12; j++) {
      this.statistics.push({ date: new Date(selectedYear, j), pax: 0 });
    }
    for (let x = 0; x < allStats.length; x++) {
      const currentDate: Date = new Date(allStats[x].date);
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      for (let j = 0; j < 12; j++) {
        if (currentYear === selectedYear && currentMonth === j) {
          this.statistics[j].pax += allStats[x].pax;
        }
      }
    }

  }


  ngOnInit() {
    let valueChanged = false;
    const uid = this._authService.getCurrentBusiness();
    let currentBusiness;

    this._businessService.getBusinesses().subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        if (response[i].id === uid) {

          currentBusiness = response[i];

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
      if (!valueChanged) {
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


  }

}
export interface statisics {
  date: Date;
  pax: number;
}


