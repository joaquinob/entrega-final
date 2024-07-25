import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canCancel',
  standalone: true
})
export class CanCancelPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
