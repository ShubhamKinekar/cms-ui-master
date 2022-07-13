import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressModificationCorrespondenceComponent } from './address-modification-correspondence.component';

describe('AddressModificationCorrespondenceComponent', () => {
  let component: AddressModificationCorrespondenceComponent;
  let fixture: ComponentFixture<AddressModificationCorrespondenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressModificationCorrespondenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressModificationCorrespondenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
