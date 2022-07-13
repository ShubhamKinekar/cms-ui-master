import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PancardTradingDematComponent } from './pan-card-trading-demat.component';

describe('PancardTradingDematComponent', () => {
  let component: PancardTradingDematComponent;
  let fixture: ComponentFixture<PancardTradingDematComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PancardTradingDematComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PancardTradingDematComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
