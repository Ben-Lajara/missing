import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParamsFiltrosService {
  private tamano: string = '0';
  private color: string = '';
  private raza: string = '';
  private collar: boolean = false;
  constructor() {}

  getSize() {
    return this.tamano;
  }

  getColor() {
    return this.color;
  }

  getRace() {
    return this.raza;
  }

  getCollar() {
    return this.collar;
  }

  setNewSize(newSize: string) {
    this.tamano = newSize;
  }

  setNewColor(newColor: string) {
    this.color = newColor;
  }

  setNewRace(newRace: string) {
    this.raza = newRace;
  }

  setNewCollar(newCollar: boolean) {
    this.collar = newCollar;
  }
}
