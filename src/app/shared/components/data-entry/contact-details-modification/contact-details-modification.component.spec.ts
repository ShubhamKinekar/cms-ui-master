import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsModificationComponent } from './contact-details-modification.component';

describe('ContactDetailsModificationComponent', () => {
  let component: ContactDetailsModificationComponent;
  let fixture: ComponentFixture<ContactDetailsModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDetailsModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
