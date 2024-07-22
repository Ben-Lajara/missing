import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collar',
})
export class CollarPipe implements PipeTransform {
  transform(value: any[], collar: boolean = false): any[] {
    if (value && value.length && collar) {
      return value.filter((anuncio) => anuncio.collar === collar);
    }
    return value;
  }
}
