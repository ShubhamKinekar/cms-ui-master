import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovMasterComponent } from './lov-master.component';

describe('LovMasterComponent', () => {
  let component: LovMasterComponent;
  let fixture: ComponentFixture<LovMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LovMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
