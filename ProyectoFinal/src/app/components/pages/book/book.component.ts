import { Component, OnInit } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { BookService } from '../../../services/book.service';
import { AuthService } from '../../../services/auth.service';
import { formatDate } from '@angular/common';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { FiltrarPipe } from '../../../pipes/filtrar.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormatDatePipe, FiltrarPipe, FormsModule ],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[] =[]
  filtro: string = "";
  constructor(private bookService: BookService,
    public authService: AuthService
  ) {
    bookService.getAllBooks().subscribe({
      next:(response)=>{
        this.books = response as Book[]
      },
      error:()=>{}
    })
   
  }


  // public get fullStars() : number[] {
  //   const stars: number[] = []
  //   for(let i = 0; i< Math.floor(this.books);i++){
  //     stars.push(1)
  //   }
  //   return stars
  // }
  
  ngOnInit(): void {
    
  }

  
}
