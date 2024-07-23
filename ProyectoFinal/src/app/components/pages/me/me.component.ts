import { Component } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { ReviewsService } from '../../../services/reviews.service';
import { Book } from '../../../interfaces/book';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent {
  books: Book[] = [];
  user: {
    _id: string;
    username: string;
    email: string; //Cambiado a string provisionalmente
    
    image: string;
    
  };

  constructor(private bookService: BookService, private reviewsService: ReviewsService) {
    // SOLO EJEMPLO
    this.user = {
      _id: '1',
      username: 'La casa de los espíritus',
     email: 'Isabel Allende',
      image: 'https://m.media-amazon.com/images/I/611zbT8CveL._AC_UF894,1000_QL80_.jpg',
  
    };
  }

  //AGREGAR UN NUEVO LIBRO
  addNewBook() {
    Swal.fire({
      title: 'Agrega un nuevo libro',
      html: `<div>
        <div>
          <label class="form-label">Título</label>
          <input id="title" type="text" class="form-control">
        </div>
        <div>
          <label class="form-label">Autor</label>
          <input id="author" type="text" class="form-control">
        </div>
        <div>
          <label class="form-label">Género</label>
          <input id="genre" type="text" class="form-control">
        </div>
        <div>
          <label class="form-label">Año de publicación</label>
          <input id="publicationYear" type="number" class="form-control">
        </div>
        <div>
          <label class="form-label">Año</label>
          <input id="year" type="number" class="form-control">
        </div>
        <div>
          <label class="form-label">Sinópsis</label>
          <input id="synopsis" type="text" class="form-control">
        </div>
        <div>
          <label class="form-label">URL de la imagen de portada</label>
          <input id="image" type="text" class="form-control">
        </div>
        <div>
          <label class="form-label">Puntuación</label>
          <input id="rating" type="number" class="form-control">
        </div>
        <div>
          <label class="form-label">Reseña</label>
          <input id="review" type="text" class="form-control">
        </div>
      </div>`,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const author = (document.getElementById('author') as HTMLInputElement).value;
        const genre = (document.getElementById('genre') as HTMLInputElement).value;
        const year = parseInt((document.getElementById('publicationYear') as HTMLInputElement).value, 10);
        const synopsis = (document.getElementById('synopsis') as HTMLInputElement).value;
        const image = (document.getElementById('image') as HTMLInputElement).value;
        const rating = parseInt((document.getElementById('rating') as HTMLInputElement).value, 10);//parseFloat??
        const review = (document.getElementById('review') as HTMLInputElement).value;
        
  
        return { author, title, rating, genre, synopsis, year, image };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newBook = result.value;
        this.bookService.addBook(newBook).subscribe({
          next: (response:any) => {
            Swal.fire({
              title: 'Has agregado un nuevo libro!',
              text: 'Gracias por tu aporte a la comunidad',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
            this.books.push(response.vehicle as Book);
            console.log(this.books)
          },
          error: (error) => {
            console.error('Error al agregar libro:', error);
            Swal.fire({
              title: 'Oops!',
              text: 'Ha ocurrido un error al agregar el libro',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }  
  

}
