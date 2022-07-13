import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovsubDetailComponent } from './lovsub-detail.component';

describe('LovsubDetailComponent', () => {
  let component: LovsubDetailComponent;
  let fixture: ComponentFixture<LovsubDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovsubDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LovsubDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
