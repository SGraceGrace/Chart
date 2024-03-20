import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayByDayReportComponent } from './day-by-day-report.component';

describe('DayByDayReportComponent', () => {
  let component: DayByDayReportComponent;
  let fixture: ComponentFixture<DayByDayReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayByDayReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayByDayReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
