import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { ReviewsService } from '../../../services/reviews.service';
import { Book } from '../../../interfaces/book';
import Swal from 'sweetalert2';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ReviewComponent } from './review/review.component';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [ReviewComponent, RouterModule],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent implements OnInit {
  books: Book[] = [];
  user!: User
  token!: string 
  constructor(
    private bookService: BookService,
    private reviewsService: ReviewsService,
    private authService: AuthService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder) {

   
      this.bookService.getByUserId(authService.user!.id).subscribe({
      next: (response) => {
        this.books = response as Book[]
        console.log(this.books)
      },
      error: (err) => {
        console.log(this.authService.user?.id)
        console.log("error al obtener los libros", err)

      }
    })
  
  }
ngOnInit(){
this.token = this.cookieService.get('user')
this.user = this.authService.getUserCookie() as User;
console.log(this.token)
console.log(this.user)
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
       
        // const token = this.token 
        


        return { author, title, genre, synopsis, publicationDate, image};
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
            }).then(function(){location.reload()});
            this.books.push(response.books as Book);
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
