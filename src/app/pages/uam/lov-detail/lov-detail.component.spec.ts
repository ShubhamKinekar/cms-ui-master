import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovDetailComponent } from './lov-detail.component';

describe('LovDetailComponent', () => {
  let component: LovDetailComponent;
  let fixture: ComponentFixture<LovDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LovDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
