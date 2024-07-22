import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color',
})
export class ColorPipe implements PipeTransform {
  transform(value: any[], color: string = ''): any[] {
    if (value && value.length) {
      return value.filter((anuncio) =>
        anuncio.color.toLowerCase().includes(color.toLowerCase())
      );
    }
    return value;
  }
}
