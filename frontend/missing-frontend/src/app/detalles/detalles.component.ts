import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css',
})
export class DetallesComponent implements OnInit {
  anuncio: any;
  id: any;
  imagenSrc: string | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getAnuncio();
  }

  getAnuncio() {
    this.http
      .get('http://localhost:8080/anuncio/' + this.id)
      .subscribe((res) => {
        this.anuncio = res;
        console.log(this.anuncio);
      });
  }

  convertirImagen(imagen: Uint8Array): void {
    const base64String = btoa(String.fromCharCode(...imagen));
    this.imagenSrc = `data:image/jpeg;base64,${base64String}`;
  }
}
