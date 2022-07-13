import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRmUploadComponent } from './master-rm-upload.component';

describe('MasterRmUploadComponent', () => {
  let component: MasterRmUploadComponent;
  let fixture: ComponentFixture<MasterRmUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterRmUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRmUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
