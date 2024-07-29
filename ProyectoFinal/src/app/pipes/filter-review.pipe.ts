import { Pipe, PipeTransform } from '@angular/core';
import { Ratings } from '../interfaces/ratings';

@Pipe({
  name: 'filterReview',
  standalone: true
})
export class FilterReviewPipe implements PipeTransform {

  transform(value: Ratings[], filtro: string): Ratings[] {
    return value.filter(x=> x.book.title.toLowerCase().includes(filtro)
     || x.review.toLocaleLowerCase().includes(filtro)
     ||  x.user.username.toLocaleLowerCase().includes(filtro))
  
  }

}
