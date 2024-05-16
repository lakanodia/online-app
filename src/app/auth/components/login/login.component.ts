import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router){

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  signIn(): void {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value)
        .subscribe(
          response => {
            console.log('Sign in successful:', response);
            // Store the token in localStorage or handle as required
            this.authService.setToken(response.token);
            // Redirect to dashboard or home page after successful sign in
            this.router.navigate(['/dashboard']); // Adjust route as needed
          },
          error => {
            console.error('Sign in failed:', error);
            // Handle error, e.g., display error message
          }
        );
    }
  }
}
