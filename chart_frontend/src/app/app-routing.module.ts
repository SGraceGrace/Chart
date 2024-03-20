import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DayByDayReportComponent } from './day-by-day-report/day-by-day-report.component';
import { DistrictWiseReportComponent } from './district-wise-report/district-wise-report.component';
import { DensityMapComponent } from './density-map/density-map.component';
import { YearWiseReportComponent } from './year-wise-report/year-wise-report.component';
import { TimeWiseReportComponent } from './time-wise-report/time-wise-report.component';

const route: Routes = [
  {
    path: "day-by-day",
    component: DayByDayReportComponent
  },
  {
    path: "district",
    component: DistrictWiseReportComponent
  },
  {
    path: "density-map",
    component: DensityMapComponent
  },
  {
    path: "year-wise-report",
    component: YearWiseReportComponent
  },
  {
    path: "time-wise-report",
    component: TimeWiseReportComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(route)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
