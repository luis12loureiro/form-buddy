# Form Buddy 🎭

A fun and interactive Angular form library that brings your forms to life with an animated character!

## Features ✨

- 👀 **Eye Tracking**: Character's eyes follow the user's mouse cursor
- 🙈 **Password Privacy**: Eyes close automatically when typing in password fields
- 🎨 **Customizable Character**: Support for custom character images with configurable eye positions
- 📝 **Dynamic Form Fields**: Easily configure form fields with various input types
- ✅ **Built-in Validation**: Form validation with visual feedback
- 📱 **Responsive Design**: Works on all screen sizes

## Screenshots

### Normal State - Eyes Follow Mouse
![Form Buddy - Eyes Open](https://github.com/user-attachments/assets/b2468704-a174-4d51-ad8d-1d0efaebf160)

### Password Field - Eyes Closed
![Form Buddy - Eyes Closed](https://github.com/user-attachments/assets/bf8b56b5-42ec-4c6f-8ca7-e5a8a45e032b)

## Installation

```bash
npm install form-buddy
```

## Usage

### 1. Import the Component

```typescript
import { Component } from '@angular/core';
import { FormBuddy, FormBuddyCharacter, FormBuddyField } from 'form-buddy';

@Component({
  selector: 'app-root',
  imports: [FormBuddy],
  templateUrl: './app.html',
})
export class App {
  character: FormBuddyCharacter = {
    bodyImage: '/path/to/character.svg',
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
    }
  ];
}
```

### 2. Add to Template

```html
<fb-form-buddy 
  [character]="character" 
  [fields]="formFields">
</fb-form-buddy>
```

## API Reference

### FormBuddyCharacter Interface

| Property | Type | Description |
|----------|------|-------------|
| `bodyImage` | `string` | URL or path to the character image (required) |
| `eyesOpenImage` | `string` | Optional separate image for eyes open state |
| `eyesClosedImage` | `string` | Optional separate image for eyes closed state |
| `leftEyePosition` | `{x: number, y: number}` | Position of left eye in pixels (optional, defaults to {x: 150, y: 100}) |
| `rightEyePosition` | `{x: number, y: number}` | Position of right eye in pixels (optional, defaults to {x: 250, y: 100}) |

### FormBuddyField Interface

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Unique field identifier (required) |
| `label` | `string` | Display label for the field (required) |
| `type` | `'text' \| 'email' \| 'password' \| 'textarea' \| 'number'` | Input field type (required) |
| `placeholder` | `string` | Placeholder text (optional) |
| `required` | `boolean` | Whether the field is required (optional) |
| `validators` | `any[]` | Array of Angular validators (optional) |

## Character Requirements

For the best experience, your character image should include:
- A visible face
- Identifiable eye positions
- Arms and hands
- A body

The character can be an animal, person, or any creature - as long as it has the features above!

## Development

### Running the Demo

```bash
npm install
npm start
```

Navigate to `http://localhost:4200/` to see the demo application.

### Building the Library

```bash
ng build form-buddy
```

The build artifacts will be stored in the `dist/form-buddy` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Created with ❤️ for making forms more engaging and fun!
