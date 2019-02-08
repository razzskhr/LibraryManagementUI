import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebookdataComponent } from './createbookdata.component';

describe('CreatebookdataComponent', () => {
  let component: CreatebookdataComponent;
  let fixture: ComponentFixture<CreatebookdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatebookdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatebookdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
