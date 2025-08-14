import { Pipe, PipeTransform } from '@angular/core';

const defaultPad = '*';

@Pipe({
  name: 'pad',
})
export class PadPipe implements PipeTransform {
  transform(
    value: string | unknown,
    padStart?: string,
    padEnd?: string,
  ): unknown {
    if (typeof value !== 'string') {
      return value;
    }
    return value
      .padStart(padStart?.length || 0, padStart || defaultPad)
      .padEnd(padEnd?.length || 0, padEnd || defaultPad);
  }
}
