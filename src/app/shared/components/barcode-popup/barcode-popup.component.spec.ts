import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodePopupComponent } from './barcode-popup.component';

describe('BarcodePopupComponent', () => {
  let component: BarcodePopupComponent;
  let fixture: ComponentFixture<BarcodePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
