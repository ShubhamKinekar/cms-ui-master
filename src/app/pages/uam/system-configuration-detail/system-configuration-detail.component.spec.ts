import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemConfigurationDetailComponent } from './system-configuration-detail.component';

describe('SystemConfigurationDetailComponent', () => {
  let component: SystemConfigurationDetailComponent;
  let fixture: ComponentFixture<SystemConfigurationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemConfigurationDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemConfigurationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
