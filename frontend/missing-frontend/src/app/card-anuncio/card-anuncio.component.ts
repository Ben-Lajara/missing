import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-anuncio',
  templateUrl: './card-anuncio.component.html',
  styleUrl: './card-anuncio.component.css',
})
export class CardAnuncioComponent {
  @Input() anuncio: any;
}
