import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../interfaces/book';
import { filter } from 'rxjs';

@Pipe({
  name: 'filtrar',
  standalone: true
})
export class FiltrarPipe implements PipeTransform {

  transform(value: Book[], filtro: string): Book[] {

    console.log(value)
    console.log(filtro)
    return value.filter(x=> x.title.toLowerCase().includes(filtro)
     || x.genre.toLocaleLowerCase().includes(filtro)
     ||  x.author.toLocaleLowerCase().includes(filtro))
  
  }
}
