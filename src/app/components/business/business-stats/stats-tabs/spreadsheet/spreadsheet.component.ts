import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ahn-spreadsheet',
  templateUrl: './spreadsheet.component.html',
  styleUrls: ['./spreadsheet.component.css']
})
export class SpreadsheetComponent implements OnInit {
  hourlyStats:any;
  constructor() { }

  ngOnInit() {
  }

}
