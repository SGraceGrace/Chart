import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DensityMapComponent } from './density-map.component';

describe('DensityMapComponent', () => {
  let component: DensityMapComponent;
  let fixture: ComponentFixture<DensityMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DensityMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DensityMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
