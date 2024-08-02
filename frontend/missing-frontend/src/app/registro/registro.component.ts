import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nomUsuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registroForm.invalid) {
      Object.keys(this.registroForm.controls).forEach((field) => {
        const control = this.registroForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const { nomUsuario, nombre, apellidos, telefono, email, pword } =
      this.registroForm.value;

    this.authService
      .register(nomUsuario, nombre, apellidos, telefono, email, pword)
      .subscribe(
        (response) => {
          if (response.status === 'success') {
            this.router.navigate(['/login']);
          } else {
            // Manejar errores específicos de registro aquí si es necesario
          }
        },
        (error) => {
          // Manejar errores de respuesta aquí
        }
      );
  }
}
