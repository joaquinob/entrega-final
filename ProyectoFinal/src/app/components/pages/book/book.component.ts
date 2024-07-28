import { Component, OnInit } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { BookService } from '../../../services/book.service';
import { AuthService } from '../../../services/auth.service';
import { SlicePipe, formatDate } from '@angular/common';
import { FormatDatePipe } from '../../../pipes/format-date.pipe';
import { FiltrarPipe } from '../../../pipes/filtrar.pipe';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { Ratings } from '../../../interfaces/ratings';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FiltrarPipe, FormsModule ,RouterModule, SlicePipe ],
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
  
  ngOnInit() {}


  // addNewReview(bookId: string) {
  //   const reviewAdd: Book| undefined = this.books.find(x => x._id === bookId);
  //   if (!reviewAdd) {
  //     // Manejar caso donde la reserva no se encuentra
  //     return;
  //   }
  
  //   Swal.fire({
  //     title: 'Agrega una nueva reseña',
  //     html: `<div>
  //       <div>
  //         <label class="form-label">Puntuación</label>
  //         <input id="rating" type="number" class="form-control">
  //       </div>
  //       <div>
  //         <label class="form-label">Reseña</label>
  //         <input id="review" type="text" class="form-control">
  //       </div>`,
  //     showCancelButton: true,
  //     confirmButtonText: 'Agregar',
  //     cancelButtonText: 'Cancelar',
  //     preConfirm: () => {
    
  //       const rating = parseInt((document.getElementById('rating') as HTMLInputElement).value);//parseFloat??
  //       const review = (document.getElementById('review') as HTMLInputElement).value;
  //       // const token = this.token 
        


  //       return {  rating, review};
  //     }
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const newBook = result.value;
  //       this.bookService.addBook(newBook).subscribe({
  //         next: (response: any) => {
  //           Swal.fire({
  //             title: 'Has agregado una nueva reseña!',
  //             text: 'Gracias por tu aporte a la comunidad',
  //             icon: 'success',
  //             showConfirmButton: false,
  //             timer: 2000
  //           });
  //           this.books.push(response.books as Book);
  //           console.log(this.books)
  //         },
  //         error: (error) => {
  //           console.error('Error al agregar libro:', error);
  //           Swal.fire({
  //             title: 'Oops!',
  //             text: 'Ha ocurrido un error al agregar la reseña',
  //             icon: 'error',
  //             showConfirmButton: false,
  //             timer: 1500
  //           });
  //         }
  //       });
  //     }
  //   });
  // }

  toggleSynopsis(book: any) {
    book.showFullSynopsis = !book.showFullSynopsis;
  }
  
}
