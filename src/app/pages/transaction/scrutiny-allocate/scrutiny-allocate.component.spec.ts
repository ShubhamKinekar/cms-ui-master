import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinyAllocateComponent } from './scrutiny-allocate.component';

describe('ScrutinyAllocateComponent', () => {
  let component: ScrutinyAllocateComponent;
  let fixture: ComponentFixture<ScrutinyAllocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrutinyAllocateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrutinyAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
