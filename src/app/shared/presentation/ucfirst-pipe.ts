import { Pipe, PipeTransform } from '@angular/core';

const capitalize = (value: string | unknown) => {
  return typeof value === 'string'
    ? value.substring(0, 1).toUpperCase() + value.substring(1)
    : value;
};

@Pipe({
  name: 'ucfirst',
})
export class UcfirstPipe implements PipeTransform {
  transform(value: string | string[] | unknown | unknown[]): unknown {
    if (Array.isArray(value)) {
      return value.map((item: string | unknown) => capitalize(item));
    }
    return capitalize(value);
  }
}
