import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressModificationPermanentComponent } from './address-modification-permanent.component';

describe('AddressModificationPermanentComponent', () => {
  let component: AddressModificationPermanentComponent;
  let fixture: ComponentFixture<AddressModificationPermanentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressModificationPermanentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressModificationPermanentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
