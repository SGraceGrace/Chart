import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-year-wise-report',
  templateUrl: './year-wise-report.component.html',
  styleUrls: ['./year-wise-report.component.scss'],
})
export class YearWiseReportComponent implements OnInit {

  year: number[] = [];
  count: number[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getYearWiseReport();
  }

  getYearWiseReport() {
    this.year = [];
    this.count = [];

    this.appService.getUsersByYear().subscribe((data) => {
      data.forEach((value) => {
        this.year.push(value.year);
        this.count.push(value.count);
      });
      this.createChart();
    });
  }

  chart!: any;

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart('chart', {
      type: 'bar',
      data: {
        labels: this.year,
        datasets: [
          {
            label: 'No.of.users registered per year',
            data: this.count,
            backgroundColor: [
              'rgba(255, 99, 132, 2)',
              'rgba(255, 159, 64, 2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)'
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
