import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-anuncio-usuario',
  templateUrl: './card-anuncio-usuario.component.html',
  styleUrl: './card-anuncio-usuario.component.css',
})
export class CardAnuncioUsuarioComponent {
  @Input() anuncio: any;

  constructor(private http: HttpClient) {}
}
