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

  constructor() { }

  ngOnInit() {
  }

}
