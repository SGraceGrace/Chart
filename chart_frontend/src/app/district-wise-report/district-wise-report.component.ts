import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-district-wise-report',
  templateUrl: './district-wise-report.component.html',
  styleUrls: ['./district-wise-report.component.scss'],
})
export class DistrictWiseReportComponent implements OnInit {
  district: string[] = [];
  count: number[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.appService.getUsersByDistrict().subscribe((response) => {
      response.forEach((data) => {
        this.district.push(data.state);
        this.count.push(data.count);
      })
      this.createPieChart();
    });
  }

  createPieChart() {
    new Chart('chart', {
      type: 'pie',
      data: {
        labels: this.district,
        datasets: [
          {
            label: 'Users in this state',
            data: this.count,
            hoverOffset: 4,
          },
        ],
      },
    });
  }
}
