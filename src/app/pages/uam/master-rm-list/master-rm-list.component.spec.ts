import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRmListComponent } from './master-rm-list.component';

describe('MasterRmListComponent', () => {
  let component: MasterRmListComponent;
  let fixture: ComponentFixture<MasterRmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterRmListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
