import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchMasterListComponent } from './batch-master-list.component';

describe('BatchMasterListComponent', () => {
  let component: BatchMasterListComponent;
  let fixture: ComponentFixture<BatchMasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchMasterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
