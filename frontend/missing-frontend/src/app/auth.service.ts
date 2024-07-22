import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('');

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get currentUsername() {
    return this.username.asObservable();
  }
  constructor(private http: HttpClient, private router: Router) {
    this.inicializarUsuario();
  }

  inicializarUsuario() {
    const authToken = localStorage.getItem('authToken');
    const username = localStorage.getItem('username');

    if (authToken && username) {
      this.loggedIn.next(true);
      this.username.next(username);
    }
  }

  setSession(username: string, token: string) {
    localStorage.setItem('username', username);
    localStorage.setItem('authToken', token);

    this.loggedIn.next(true);
    this.username.next(username);
  }

  register(
    nomUsuario: string,
    nombre: string,
    apellidos: string,
    telefono: number,
    email: string,
    pword: string
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/usuario/registro`,
      {},
      {
        params: {
          nomUsuario: nomUsuario,
          nombre: nombre,
          apellidos: apellidos,
          telefono: telefono,
          email: email,
          pword: pword,
        },
      }
    );
  }

  login(nombre: string, pword: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/usuario/login`,
        {},
        {
          params: {
            nomUsuario: nombre,
            pword: pword,
          },
        }
      )
      .pipe(
        catchError((error) => {
          return throwError(error); // Propagar el error para que se maneje en el componente LoginComponent
        }),
        tap((data: any) => {
          if (data.status === 'success') {
            this.setSession(data.username, data.token);
          }
        })
      );
  }

  logout(): void {
    console.log('Logged out');
    this.loggedIn.next(false);
    this.username.next('');
    // Elimina el token de autenticación y el nombre de usuario de localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    this.router.navigate(['/home']);
  }
}
