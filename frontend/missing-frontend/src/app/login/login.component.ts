import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  email = '';
  pword = '';
  restablecer = false;
  error = false;
  emailError = '';
  pwordError = '';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      pword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach((field) => {
        const control = this.loginForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const { email, pword } = this.loginForm.value;

    this.authService.login(email, pword).subscribe(
      (response) => {
        console.log('Response: ', response);
        if (response.status === 'success') {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.log('Error: ', error.message);
        if (error.message === 'User not found') {
          this.loginForm.get('email')?.setErrors({ exists: true });
        } else if (error.message === 'Invalid password') {
          this.loginForm.get('pword')?.setErrors({ incorrect: true });
        }
      }
    );
  }
}
