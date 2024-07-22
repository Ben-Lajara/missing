import { Component, OnInit } from '@angular/core';
import { ParamsFiltrosService } from '../params-filtros.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css',
})
export class FiltrosComponent {
  private tamano: any;

  constructor(private filtros: ParamsFiltrosService) {}

  setNewSize(newSize: string) {
    this.filtros.setNewSize(newSize);
  }

  setNewColor(newColor: string) {
    this.filtros.setNewColor(newColor);
  }

  setNewRace(newRace: string) {
    this.filtros.setNewRace(newRace);
  }

  setHasCollar(hasCollar: boolean) {
    this.filtros.setNewCollar(hasCollar);
  }
}
