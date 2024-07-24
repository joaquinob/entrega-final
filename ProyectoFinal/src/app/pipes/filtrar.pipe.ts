import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces/book';

@Pipe({
  name: 'filtrar',
  standalone: true
})
export class FiltrarPipe implements PipeTransform {

  transform(value: Book[], filtro: string): Book[] {
    return value.filter(x=> x.title.toLowerCase().includes(filtro))
    //  || x.genre.toLocaleLowerCase().includes(filtro)
  //    ||  x.author.toLocaleLowerCase().includes(filtro))
  // }
  }
}
