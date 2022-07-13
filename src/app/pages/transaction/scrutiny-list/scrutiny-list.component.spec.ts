import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrutinyListComponent } from './scrutiny-list.component';

describe('ScrutinyListComponent', () => {
  let component: ScrutinyListComponent;
  let fixture: ComponentFixture<ScrutinyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrutinyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrutinyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
