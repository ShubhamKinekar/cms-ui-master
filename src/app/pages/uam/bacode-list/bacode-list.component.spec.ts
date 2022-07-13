import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacodeListComponent } from './bacode-list.component';

describe('BacodeListComponent', () => {
  let component: BacodeListComponent;
  let fixture: ComponentFixture<BacodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BacodeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BacodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
