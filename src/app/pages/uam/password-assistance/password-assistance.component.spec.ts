import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordAssistanceComponent } from './password-assistance.component';

describe('PasswordAssistanceComponent', () => {
  let component: PasswordAssistanceComponent;
  let fixture: ComponentFixture<PasswordAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordAssistanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
