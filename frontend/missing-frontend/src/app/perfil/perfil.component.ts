import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
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
export class PerfilComponent implements OnInit {
  anuncios: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('username'));
    this.getAnuncios();
  }

  getAnuncios() {
    const nomUsuario = localStorage.getItem('username');
    if (nomUsuario === null) {
      return;
    }
    this.http
      .get('http://localhost:8080/usuario/anuncios', {
        params: {
          nomUsuario: nomUsuario,
        },
      })
      .subscribe((res) => {
        this.anuncios = res;
        console.log(res);
      });
  }
}
