import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuddy, FormBuddyCharacter, FormBuddyField } from './form-buddy';

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
    
    // Set required inputs
    component.character = {
      bodyImage: '/test.svg',
      leftEyePosition: { x: 100, y: 100 },
      rightEyePosition: { x: 200, y: 100 }
    };
    
    component.fields = [
      {
        name: 'test',
        label: 'Test Field',
        type: 'text'
      }
    ];
    
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize form with provided fields', () => {
    expect(component.formGroup).toBeTruthy();
    expect(component.formGroup.get('test')).toBeTruthy();
  });
  
  it('should set isPasswordFocused to true when password field is focused', () => {
    const passwordField: FormBuddyField = {
      name: 'password',
      label: 'Password',
      type: 'password'
    };
    
    component.onFieldFocus(passwordField);
    expect(component.isPasswordFocused).toBe(true);
  });
  
  it('should set isPasswordFocused to false when password field is blurred', () => {
    const passwordField: FormBuddyField = {
      name: 'password',
      label: 'Password',
      type: 'password'
    };
    
    component.isPasswordFocused = true;
    component.onFieldBlur(passwordField);
    expect(component.isPasswordFocused).toBe(false);
  });
  
  it('should not change isPasswordFocused for non-password fields', () => {
    const textField: FormBuddyField = {
      name: 'username',
      label: 'Username',
      type: 'text'
    };
    
    component.onFieldFocus(textField);
    expect(component.isPasswordFocused).toBe(false);
  });
});
