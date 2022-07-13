import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemConfigurationListComponent } from './system-configuration-list.component';

describe('SystemConfigurationListComponent', () => {
  let component: SystemConfigurationListComponent;
  let fixture: ComponentFixture<SystemConfigurationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemConfigurationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemConfigurationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
