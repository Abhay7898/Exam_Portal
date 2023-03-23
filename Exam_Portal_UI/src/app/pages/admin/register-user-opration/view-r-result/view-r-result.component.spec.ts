import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRResultComponent } from './view-r-result.component';

describe('ViewRResultComponent', () => {
  let component: ViewRResultComponent;
  let fixture: ComponentFixture<ViewRResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
