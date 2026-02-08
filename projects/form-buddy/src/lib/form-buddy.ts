import { Component, Input, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

export interface FormBuddyField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'number';
  placeholder?: string;
  required?: boolean;
  validators?: any[];
}

export interface FormBuddyCharacter {
  bodyImage: string;
  eyesOpenImage?: string;
  eyesClosedImage?: string;
  leftEyePosition?: { x: number; y: number };
  rightEyePosition?: { x: number; y: number };
}

@Component({
  selector: 'fb-form-buddy',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="form-buddy-container">
      <div class="character-container">
        <!-- Body Image -->
        <img [src]="character.bodyImage" alt="Character" class="character-body" />
        
        <!-- Eyes Container -->
        <div class="eyes-container">
          <!-- Left Eye -->
          <div class="eye left-eye" 
               [style.left.px]="character.leftEyePosition?.x || 150"
               [style.top.px]="character.leftEyePosition?.y || 100">
            <div class="pupil" 
                 [style.transform]="'translate(' + leftPupilX + 'px, ' + leftPupilY + 'px)'"
                 [class.hidden]="isPasswordFocused"></div>
          </div>
          
          <!-- Right Eye -->
          <div class="eye right-eye" 
               [style.left.px]="character.rightEyePosition?.x || 250"
               [style.top.px]="character.rightEyePosition?.y || 100">
            <div class="pupil" 
                 [style.transform]="'translate(' + rightPupilX + 'px, ' + rightPupilY + 'px)'"
                 [class.hidden]="isPasswordFocused"></div>
          </div>
          
          <!-- Eyelids for password -->
          <div class="eyelid left-eyelid" 
               [class.closed]="isPasswordFocused"
               [style.left.px]="character.leftEyePosition?.x || 150"
               [style.top.px]="character.leftEyePosition?.y || 100"></div>
          <div class="eyelid right-eyelid" 
               [class.closed]="isPasswordFocused"
               [style.left.px]="character.rightEyePosition?.x || 250"
               [style.top.px]="character.rightEyePosition?.y || 100"></div>
        </div>
      </div>
      
      <div class="form-container">
        <form [formGroup]="formGroup">
          <div class="form-field" *ngFor="let field of fields">
            <label [for]="field.name">{{ field.label }}</label>
            
            <input 
              *ngIf="field.type !== 'textarea'"
              [type]="field.type"
              [id]="field.name"
              [formControlName]="field.name"
              [placeholder]="field.placeholder || ''"
              (focus)="onFieldFocus(field)"
              (blur)="onFieldBlur(field)"
              class="form-input"
            />
            
            <textarea 
              *ngIf="field.type === 'textarea'"
              [id]="field.name"
              [formControlName]="field.name"
              [placeholder]="field.placeholder || ''"
              (focus)="onFieldFocus(field)"
              (blur)="onFieldBlur(field)"
              class="form-input"
              rows="4"
            ></textarea>
            
            <div class="error-message" *ngIf="formGroup.get(field.name)?.invalid && formGroup.get(field.name)?.touched">
              <span *ngIf="formGroup.get(field.name)?.errors?.['required']">{{ field.label }} is required</span>
            </div>
          </div>
          
          <button type="submit" class="submit-button" [disabled]="!formGroup.valid">
            Submit
          </button>
        </form>
      </div>
    </div>
  `,
  styles: `
    .form-buddy-container {
      display: flex;
      gap: 2rem;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .character-container {
      position: relative;
      flex: 0 0 400px;
      height: 500px;
    }
    
    .character-body {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    
    .eyes-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    .eye {
      position: absolute;
      width: 40px;
      height: 40px;
      background: white;
      border-radius: 50%;
      border: 2px solid #333;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .pupil {
      width: 20px;
      height: 20px;
      background: #333;
      border-radius: 50%;
      transition: transform 0.1s ease-out;
    }
    
    .pupil.hidden {
      opacity: 0;
    }
    
    .eyelid {
      position: absolute;
      width: 40px;
      height: 40px;
      background: #ffcc99;
      border-radius: 50%;
      transform: translateY(-50px);
      transition: transform 0.3s ease-out;
      z-index: 10;
    }
    
    .eyelid.closed {
      transform: translateY(0);
    }
    
    .form-container {
      flex: 1;
      min-width: 300px;
    }
    
    .form-field {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }
    
    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    .form-input:focus {
      outline: none;
      border-color: #4CAF50;
    }
    
    .error-message {
      color: #f44336;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    
    .submit-button {
      width: 100%;
      padding: 1rem;
      background: #4CAF50;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .submit-button:hover:not(:disabled) {
      background: #45a049;
    }
    
    .submit-button:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
      .form-buddy-container {
        flex-direction: column;
      }
      
      .character-container {
        flex: 0 0 300px;
        height: 300px;
      }
    }
  `,
})
export class FormBuddy implements OnInit, OnDestroy {
  @Input() character!: FormBuddyCharacter;
  @Input() fields: FormBuddyField[] = [];
  
  formGroup!: FormGroup;
  leftPupilX = 0;
  leftPupilY = 0;
  rightPupilX = 0;
  rightPupilY = 0;
  isPasswordFocused = false;
  
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit() {
    this.initializeForm();
  }
  
  ngOnDestroy() {}
  
  initializeForm() {
    const group: any = {};
    this.fields.forEach(field => {
      const validators = [];
      if (field.required) {
        validators.push(Validators.required);
      }
      if (field.validators) {
        validators.push(...field.validators);
      }
      group[field.name] = new FormControl('', validators);
    });
    this.formGroup = new FormGroup(group);
  }
  
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isPasswordFocused) return;
    
    const leftEyePos = {
      x: (this.character.leftEyePosition?.x || 150) + 20,
      y: (this.character.leftEyePosition?.y || 100) + 20
    };
    
    const rightEyePos = {
      x: (this.character.rightEyePosition?.x || 250) + 20,
      y: (this.character.rightEyePosition?.y || 100) + 20
    };
    
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Calculate left pupil position
    const leftAngle = Math.atan2(mouseY - leftEyePos.y, mouseX - leftEyePos.x);
    const leftDistance = Math.min(10, Math.sqrt(Math.pow(mouseX - leftEyePos.x, 2) + Math.pow(mouseY - leftEyePos.y, 2)) / 20);
    this.leftPupilX = Math.cos(leftAngle) * leftDistance;
    this.leftPupilY = Math.sin(leftAngle) * leftDistance;
    
    // Calculate right pupil position
    const rightAngle = Math.atan2(mouseY - rightEyePos.y, mouseX - rightEyePos.x);
    const rightDistance = Math.min(10, Math.sqrt(Math.pow(mouseX - rightEyePos.x, 2) + Math.pow(mouseY - rightEyePos.y, 2)) / 20);
    this.rightPupilX = Math.cos(rightAngle) * rightDistance;
    this.rightPupilY = Math.sin(rightAngle) * rightDistance;
  }
  
  onFieldFocus(field: FormBuddyField) {
    if (field.type === 'password') {
      this.isPasswordFocused = true;
    }
  }
  
  onFieldBlur(field: FormBuddyField) {
    if (field.type === 'password') {
      this.isPasswordFocused = false;
    }
  }
}
