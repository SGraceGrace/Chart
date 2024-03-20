import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { DayByDayReportComponent } from './day-by-day-report/day-by-day-report.component';
import { AppRoutingModule } from './app-routing.module';
import { DistrictWiseReportComponent } from './district-wise-report/district-wise-report.component';
import { FormsModule } from '@angular/forms';
import { DensityMapComponent } from './density-map/density-map.component';
import { YearWiseReportComponent } from './year-wise-report/year-wise-report.component';
import { TimeWiseReportComponent } from './time-wise-report/time-wise-report.component';

@NgModule({
  declarations: [
    AppComponent,
    DayByDayReportComponent,
    DistrictWiseReportComponent,
    DensityMapComponent,
    YearWiseReportComponent,
    TimeWiseReportComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
