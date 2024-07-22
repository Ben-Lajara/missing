import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'raza',
})
export class RazaPipe implements PipeTransform {
  transform(value: any[], raza: string = ''): any[] {
    if (value && value.length) {
      return value.filter((anuncio) =>
        anuncio.raza.toLowerCase().includes(raza.toLowerCase())
      );
    }
    return value;
  }
}
