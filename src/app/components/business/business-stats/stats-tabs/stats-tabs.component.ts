
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ahn-stats-tabs',
  
  templateUrl: './stats-tabs.component.html',
  styleUrls: ['./stats-tabs.component.css']
})
export class StatsTabsComponent implements OnInit {

  selDate:Date;
  constructor() { }

  ngOnInit() {
    console.log(this.selDate)
  }

}
