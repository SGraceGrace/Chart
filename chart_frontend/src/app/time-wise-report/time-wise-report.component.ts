import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-time-wise-report',
  templateUrl: './time-wise-report.component.html',
  styleUrls: ['./time-wise-report.component.scss']
})
export class TimeWiseReportComponent {

  times: any;
  count: number[] = [];
  selectedMonth: number = 1;
  selectedYear: number = 2023;
  months = [
    {
      value: 1,
      name: 'JANUARY',
    },
    {
      value: 2,
      name: 'FEBRAURY',
    },
    {
      value: 3,
      name: 'MARCH',
    },
    {
      value: 4,
      name: 'APRIL',
    },
    {
      value: 5,
      name: 'MAY',
    },
    {
      value: 6,
      name: 'JUNE',
    },
    {
      value: 7,
      name: 'JULY',
    },
    {
      value: 8,
      name: 'AUGUST',
    },
    {
      value: 9,
      name: 'SEPTEMBER',
    },
    {
      value: 10,
      name: 'OCTOBER',
    },
    {
      value: 11,
      name: 'NOVEMBER',
    },
    {
      value: 12,
      name: 'DECEMBER',
    },
  ];

  years = [
    {
      value: 1,
      name: '2023',
    },
    {
      value: 2,
      name: '2024',
    },
  ];

  constructor(private appService: AppService){}

  getUsersByTime(){
    this.times = [];
    this.count = [];
    this.appService.getUsersByTime(5, 2023).subscribe((response) => {
      response.forEach((data) => {
        this.times.push(data.times);
        this.count.push(data.count);
      });
      console.log(response);
      
      this.createChart();
    })
  }

  onSelect() {
    this.getUsersByTime();;
  }

  chart!: any;

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('chart', {
      type: 'bar',
      data: {
        labels: this.times,
        datasets: [
          {
            label: 'No.of.users registered in two-hours interval',
            data: this.count,
            backgroundColor: [
              'rgba(255, 99, 132, 2)',
              'rgba(255, 159, 64, 2)',
              'rgba(255, 205, 86, 2)',
              'rgba(75, 192, 192, 2)',
              'rgba(54, 162, 235, 2)',
              'rgba(153, 102, 255, 2)',
              'rgba(201, 203, 207, 2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
