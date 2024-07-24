import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

 
  transform(value: number): string {
    return new Date(value).toLocaleDateString();
  }
}
