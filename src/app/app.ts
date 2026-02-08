import { Component } from '@angular/core';
import { FormBuddy, FormBuddyCharacter, FormBuddyField } from 'form-buddy';

@Component({
  selector: 'app-root',
  imports: [FormBuddy],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  character: FormBuddyCharacter = {
    bodyImage: '/character.svg',
    leftEyePosition: { x: 165, y: 135 },
    rightEyePosition: { x: 215, y: 135 }
  };
  
  formFields: FormBuddyField[] = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'Enter your username',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Tell us about yourself'
    }
  ];
}
