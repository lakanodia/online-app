import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{

  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: [''],
      phone: [''],
      zipcode: [''],
      avatar: [''],
      gender: ['MALE']
    });
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value)
        .subscribe(
          response => {
            console.log('Sign up successful:', response);
            alert("Sign up successful");
            // Handle success, e.g., redirect to login page
          },
          error => {
            alert(error.error.errorKeys);
            console.error('Sign up failed:', error);
            // Handle error, e.g., display error message
          }
        );
    }else{
      alert("ფორმა არავალიდურია !");

    }
  }



}
