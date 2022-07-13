import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchMasterDetailComponent } from './batch-master-detail.component';

describe('BatchMasterDetailComponent', () => {
  let component: BatchMasterDetailComponent;
  let fixture: ComponentFixture<BatchMasterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchMasterDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchMasterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
