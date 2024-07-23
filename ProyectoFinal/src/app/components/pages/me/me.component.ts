import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { ReviewsService } from '../../../services/reviews.service';
import { Book } from '../../../interfaces/book';
import Swal from 'sweetalert2';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent implements OnInit {
  books: Book[] = [];
  user!: User
  token!: string 
  // user: {
  //   _id: string;
  //   username: string;
  //   email: string; //Cambiado a string provisionalmente

  //   image: string;

  // };

  constructor(
    private bookService: BookService,
    private reviewsService: ReviewsService,
    private authService: AuthService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder) {

   
      // this.bookService.getByUserId(authService.user!.id).subscribe({
      // next: (response) => {
      //   this.books = response as Book[]
      // },
      // error: (err) => {
      //   console.log("error al obtener los libros", err)

    //   }
    // })






    // SOLO EJEMPLO
    // this.user = {
    //   _id: '1',
    //   username: 'La casa de los espíritus',
    //  email: 'Isabel Allende',
    //   image: 'https://m.media-amazon.com/images/I/611zbT8CveL._AC_UF894,1000_QL80_.jpg',

    // };
  }
ngOnInit(){
this.token = this.cookieService.get('user')
console.log(this.token)
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
          <label class="form-label">Año</label>
          <input id="publicationDate" type="number" class="form-control">
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
        <div>
         <label class="form-label">Like?</label>
        <input id="like" type="checkbox" class="form-control">
      </div>`,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const author = (document.getElementById('author') as HTMLInputElement).value;
        const genre = (document.getElementById('genre') as HTMLInputElement).value;
        const publicationDate = parseInt((document.getElementById('publicationDate') as HTMLInputElement).value);
        const synopsis = (document.getElementById('synopsis') as HTMLInputElement).value;
        const image = (document.getElementById('image') as HTMLInputElement).value;
        const rating = parseInt((document.getElementById('rating') as HTMLInputElement).value);//parseFloat??
        const review = (document.getElementById('review') as HTMLInputElement).value;
        const like = (document.getElementById('like') as HTMLInputElement).value
        // const token = this.token 


        return { author, title, rating, genre, synopsis, publicationDate, image, review, like };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newBook = result.value;
        this.bookService.addBook(newBook).subscribe({
          next: (response: any) => {
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
