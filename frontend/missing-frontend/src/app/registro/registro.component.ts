import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RegistroComponent {
  registroForm!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        nombre: ['', Validators.required],
        apellidos: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
        pword: ['', Validators.required],
        pword2: ['', Validators.required],
      },
      { validator: this.checkPwords }
    );
  }

  checkPwords(group: UntypedFormGroup) {
    const pass = group.get('pword')?.value;
    const confirmPass = group.get('pword2')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      Object.keys(this.registroForm.controls).forEach((field) => {
        const control = this.registroForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const { email, nombre, apellidos, telefono, pword } =
      this.registroForm.value;

    this.authService
      .register(email, nombre, apellidos, telefono, pword)
      .subscribe(
        (success) => {
          console.log('Registration Success');
          this.authService.login(email, pword).subscribe(
            (success) => this.router.navigate(['/perfil']),
            (error) => console.log('Login Error', error.error)
          );
        },
        (error) => {
          if (error.message === 'User already exists') {
            this.registroForm.get('email')?.setErrors({ exists: true });
          }
        }
      );
  }
}
