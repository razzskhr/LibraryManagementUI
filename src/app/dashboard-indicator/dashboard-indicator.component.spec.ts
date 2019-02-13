import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIndicatorComponent } from './dashboard-indicator.component';

describe('DashboardIndicatorComponent', () => {
  let component: DashboardIndicatorComponent;
  let fixture: ComponentFixture<DashboardIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
