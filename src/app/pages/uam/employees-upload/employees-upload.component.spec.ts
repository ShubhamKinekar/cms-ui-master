import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesUploadComponent } from './employees-upload.component';

describe('EmployeesUploadComponent', () => {
  let component: EmployeesUploadComponent;
  let fixture: ComponentFixture<EmployeesUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
