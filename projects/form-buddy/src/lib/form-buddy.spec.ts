import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuddy } from './form-buddy';

describe('FormBuddy', () => {
  let component: FormBuddy;
  let fixture: ComponentFixture<FormBuddy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormBuddy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBuddy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
