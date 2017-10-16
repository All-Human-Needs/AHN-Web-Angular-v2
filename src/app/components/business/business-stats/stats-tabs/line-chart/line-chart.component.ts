import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ahn-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  public lineChartData:Array<any> = [
    {data: [], label: '',gridLines:{color:'#000',lineWidth:1}},
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {responsive: true,};
  public lineChartColors:Array<any> = [{ 
      backgroundColor: 'rgba(98, 160, 252,0.5)',
      borderColor: 'rgb(168, 179, 196)',
      pointBackgroundColor: 'rgb(155, 177, 198)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: 'rgb(79, 169, 255)',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    }];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor() { }

  ngOnInit() {
  }

}
