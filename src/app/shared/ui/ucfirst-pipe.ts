import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ucfirst',
})
export class UcfirstPipe implements PipeTransform {
  transform(value: string | unknown): unknown {
    return typeof value === 'string'
      ? value.substring(0, 1).toUpperCase() + value.substring(1)
      : value;
  }
}
