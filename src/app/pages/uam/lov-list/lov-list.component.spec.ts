import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovListComponent } from './lov-list.component';

describe('LovListComponent', () => {
  let component: LovListComponent;
  let fixture: ComponentFixture<LovListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LovListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
