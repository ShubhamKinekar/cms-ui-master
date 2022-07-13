import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerAllocateComponent } from './checker-allocate.component';

describe('CheckerAllocateComponent', () => {
  let component: CheckerAllocateComponent;
  let fixture: ComponentFixture<CheckerAllocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckerAllocateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
