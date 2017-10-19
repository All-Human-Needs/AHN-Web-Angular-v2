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
  statistics: statisics[]=[];
  selectedDate:Date = new Date("2017-9-17");
  constructor(private _businessService: BusinessService) { }

  getHourlyStats(i:number) {
    this._businessService.getBusinesses().subscribe(
      response => {
        let allStats = response[i].stats;
        if(this.selectedDate===null || this.selectedDate===undefined){
          this.selectedDate = new Date();
        }
        let selectedDay = this.selectedDate.getDate();
        let selectedMonth = this.selectedDate.getMonth();

        for (var x = 0; x < allStats.length; x++) {
          let currentDate:Date = new Date(allStats[x].date);
          let currentDay = currentDate.getDate();
          let currentMonth = currentDate.getMonth();
          if(selectedDay===currentDay && selectedMonth===currentMonth){
            let Newstat:statisics ={
            date: currentDate,
            pax: allStats[x].pax,
          }
          this.statistics.push(Newstat);
          }
        }

      }
    )
  }

  ngOnInit() {
    this.getHourlyStats(0);


   
  }

}

interface statisics{
  date:Date;
  pax:number;
}
