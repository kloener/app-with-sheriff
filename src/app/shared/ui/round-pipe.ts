import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
})
export class RoundPipe implements PipeTransform {
  transform(value: number | unknown): number | unknown {
    return typeof value === 'number' ? Math.round(value) : value;
  }
}
