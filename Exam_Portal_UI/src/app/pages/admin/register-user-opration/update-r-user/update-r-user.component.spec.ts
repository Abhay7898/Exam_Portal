import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRUserComponent } from './update-r-user.component';

describe('UpdateRUserComponent', () => {
  let component: UpdateRUserComponent;
  let fixture: ComponentFixture<UpdateRUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
