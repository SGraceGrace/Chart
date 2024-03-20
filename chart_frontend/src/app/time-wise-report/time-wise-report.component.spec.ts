import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeWiseReportComponent } from './time-wise-report.component';

describe('TimeWiseReportComponent', () => {
  let component: TimeWiseReportComponent;
  let fixture: ComponentFixture<TimeWiseReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeWiseReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
