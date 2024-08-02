import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fade', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [animate('300ms ease-in')]),
      transition('visible => hidden', [animate('300ms ease-out')]),
    ]),
  ],
})
export class EditarComponent implements OnInit {
  anuncio: any;
  titulo: any;
  descripcion: any;
  fecha = new Date();
  raza: any;
  color: any;
  tamano: any;
  collar = false;
  vacunado = false;
  hoy = new Date();
  id: any;
  loading = false;
  cambiosGuardados = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this.cambiosGuardados = false;
    this.loading = false;
    this.getAnuncio();
  }

  getAnuncio() {
    this.http
      .get('http://localhost:8080/anuncio/' + this.id)
      .subscribe((res) => {
        this.anuncio = res;
        this.titulo = this.anuncio.titulo;
        this.descripcion = this.anuncio.descripcion;
        this.fecha = this.anuncio.fecha;
        this.raza = this.anuncio.raza;
        this.color = this.anuncio.color;
        this.tamano = this.anuncio.tamano;
        this.collar = this.anuncio.collar;
        this.vacunado = this.anuncio.vacunado;
        console.log(this.anuncio);
      });
  }

  deleteAnuncio() {
    if (confirm('¿Estás seguro de que quieres eliminar este anuncio?')) {
      this.loading = true;
      this.http
        .delete('http://localhost:8080/anuncio', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          params: {
            id: this.id,
            nomUsuario: this.anuncio.nomUsuario,
          },
        })
        .subscribe(
          (response) => {
            console.log(response);
            setTimeout(() => {
              this.loading = false;
              this.router.navigate(['/perfil']);
            }, 3000);
          },
          (error) => {
            console.error(error);
          }
        );
    }
  }

  onSubmit() {
    console.log();
    this.http
      .put(
        'http://localhost:8080/anuncio',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          params: {
            id: this.id,
            titulo: this.titulo,
            descripcion: this.descripcion,
            fecha: this.fecha.toString(),
            raza: this.raza,
            color: this.color,
            tamano: this.tamano,
            collar: this.collar,
            vacunado: this.vacunado,
            nomUsuario: this.anuncio.nomUsuario,
          },
        }
      )
      .subscribe((res) => {
        console.log(res);
        this.avisarCambiosGuardados();
      });
  }

  avisarCambiosGuardados() {
    this.cambiosGuardados = true;
    setTimeout(() => {
      this.cambiosGuardados = false;
    }, 3000);
  }
}
