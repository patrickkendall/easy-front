import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType, Chart } from 'chart.js';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  x: any;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [1, 1],
    datasets: [
      {
        data: [
          {
            x: new Date('2021-11-06 23:39:30').getSeconds(),
            y: 50,
          },
          {
            x: new Date('2021-11-06 23:39:30').getSeconds(),
            y: 60,
          },
          {
            x: new Date('2021-11-06 23:39:30').getSeconds(),
            y: 20,
          },
        ],
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "blue",
          //
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          major: {
            enabled: true,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'value',
        },
      },
    },
  };

  public lineChartLegend = true;

  constructor() {}

  ngOnInit(): void {}
}
