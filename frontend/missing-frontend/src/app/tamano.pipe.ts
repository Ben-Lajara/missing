import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tamano',
})
export class TamanoPipe implements PipeTransform {
  transform(value: any[], tam: string): any[] {
    if (value && value.length && tam != '0') {
      return value.filter((anuncio) => anuncio.tamano === tam);
    }
    return value;
  }
}
