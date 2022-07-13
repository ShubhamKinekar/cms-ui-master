import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationAddModCanComponent } from './nomination-add-mod-can.component';

describe('NominationAddModCanComponent', () => {
  let component: NominationAddModCanComponent;
  let fixture: ComponentFixture<NominationAddModCanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominationAddModCanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationAddModCanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
