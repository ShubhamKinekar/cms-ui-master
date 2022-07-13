import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LovsubListComponent } from './lovsub-list.component';

describe('LovsubListComponent', () => {
  let component: LovsubListComponent;
  let fixture: ComponentFixture<LovsubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LovsubListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LovsubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
