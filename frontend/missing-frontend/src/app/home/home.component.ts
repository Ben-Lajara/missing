import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ParamsFiltrosService } from '../params-filtros.service';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger('100ms', [animate('500ms', style({ opacity: 1 }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  radio = 2;
  tamano: any;
  latitud: any;
  longitud: any;
  anuncios: any;
  loading: boolean = false;
  ngOnInit(): void {
    this.loading = true;
    this.anuncios = [];
    this.getUbicacion();
  }

  constructor(
    private http: HttpClient,
    private filtros: ParamsFiltrosService
  ) {}

  getUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('latitud', position.coords.latitude);
        console.log('longitud', position.coords.longitude);
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
        this.getAnuncios();
      });
    } else {
      alert('Geolocalización no soportada en tu navegador');
    }
  }

  getAnuncios() {
    this.http
      .get('http://localhost:8080/anuncios', {
        params: {
          radius: this.radio,
          latitude: this.latitud,
          longitude: this.longitud,
        },
      })
      .subscribe((res) => {
        this.anuncios = res;
        this.loading = false;
        console.log(this.anuncios);
      });
  }

  getSize() {
    return this.filtros.getSize();
  }

  getColor() {
    return this.filtros.getColor();
  }

  getRace() {
    return this.filtros.getRace();
  }

  hasCollar() {
    return this.filtros.getCollar();
  }
}
