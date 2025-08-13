import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(value: string[] | unknown, separator = ' '): string | unknown {
    return Array.isArray(value) ? value.join(separator) : value;
  }
}
