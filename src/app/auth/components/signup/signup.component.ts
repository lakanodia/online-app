import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  email!: string;
  password!: string;

  constructor() { }
  signup(): void {
    // Implement sign up logic
  }
}
