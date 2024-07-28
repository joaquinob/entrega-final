import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
  standalone: true
})
export class SlicePipe implements PipeTransform {

  transform(value: string, start: number, end?: number): string | null {
    if (typeof value !== 'string') {
      return null;
    }
    if (typeof start !== 'number' || (end !== undefined && typeof end !== 'number')) {
      return value;
    }
    return value.slice(start, end);
  }

}
