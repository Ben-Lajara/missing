import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  nombre = '';
  pword = '';
  restablecer = false;
  error = false;
  nombreError = '';
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
      nombre: ['', Validators.required],
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

    const { nombre, pword } = this.loginForm.value;

    this.authService.login(nombre, pword).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.router.navigate(['/home']);
        } else {
          if (response.error === 'User not found') {
            this.loginForm.get('nombre')?.setErrors({ exists: true });
          } else if (response.error === 'Incorrect password') {
            this.loginForm.get('pword')?.setErrors({ incorrect: true });
          }
        }
      },
      (error) => {
        if (error.error.error === 'User not found') {
          this.loginForm.get('nombre')?.setErrors({ exists: true });
        } else if (error.error.error === 'Incorrect password') {
          this.loginForm.get('pword')?.setErrors({ incorrect: true });
        }
      }
    );
  }
}
