import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRmDetailComponent } from './master-rm-detail.component';

describe('MasterRmDetailComponent', () => {
  let component: MasterRmDetailComponent;
  let fixture: ComponentFixture<MasterRmDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterRmDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
