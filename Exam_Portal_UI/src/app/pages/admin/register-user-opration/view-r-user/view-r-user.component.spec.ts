import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRUserComponent } from './view-r-user.component';

describe('ViewRUserComponent', () => {
  let component: ViewRUserComponent;
  let fixture: ComponentFixture<ViewRUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
