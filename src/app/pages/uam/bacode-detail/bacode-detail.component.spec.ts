import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacodeDetailComponent } from './bacode-detail.component';

describe('BacodeDetailComponent', () => {
  let component: BacodeDetailComponent;
  let fixture: ComponentFixture<BacodeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacodeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacodeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
