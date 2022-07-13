import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryAllocateComponent } from './data-entry-allocate.component';

describe('DataEntryAllocateComponent', () => {
  let component: DataEntryAllocateComponent;
  let fixture: ComponentFixture<DataEntryAllocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataEntryAllocateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEntryAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
