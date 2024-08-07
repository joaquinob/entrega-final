import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { Book } from '../../../../interfaces/book';
import { BookService } from '../../../../services/book.service';
import { AuthService } from '../../../../services/auth.service';
import { FiltrarPipe } from '../../../../pipes/filtrar.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FiltrarPipe, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  filtro: string = "";

  constructor(private bookService: BookService, private authService: AuthService) { }

  ngOnInit() {
    this.bookService.getAllBooks().subscribe({
      next: (response) => {
        console.log('Books:', response);
        this.books = response as Book[];
      },
      error: () => {
        // Handle error appropriately
      }
    });
  }

  eliminar(bookId: string) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.deleteBook(bookId).subscribe({
          next: () => {
            Swal.fire({
              title: "¡Libro eliminado!",
              text: "Este libro ha sido eliminada correctamente",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            }).then(function(){location.reload()});

            this.books = this.books.filter(x => x._id !== bookId);
          },
          error: () => {
            Swal.fire({
              title: "Oops!",
              text: "Ha ocurrido un error",
              icon: "error",
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }

  editar(bookId: string) {
    console.log('Editar libro:', bookId);
    const bookEdit: Book | undefined = this.books.find(x => x._id === bookId);
    if (bookEdit) {
      console.log('Editar libro:', bookEdit);

      Swal.fire({
        title: `Editar reserva de "${bookEdit.title}"`,
        html: `<div>
          <div>
            <label class="form-label">Título</label>
            <input id="title" type="string" class="form-control" value="${bookEdit.title}">
          </div>
          <div>
            <label class="form-label">Autor</label>
            <input id="author" type="string" class="form-control" value="${bookEdit.author}">
          </div>
          <div>
            <label class="form-label">Año</label>
            <input id="publicationDate" type="number" class="form-control" value="${bookEdit.publicationDate}">
          </div>
          <div>
            <label class="form-label">Género</label>
            <input id="genre" type="string" class="form-control" value="${bookEdit.genre}">
          </div>
          <div>
            <label class="form-label">Sinópsis</label>
            <input id="synopsis" type="string" class="form-control" value="${bookEdit.synopsis}">
          </div>
          <div>
            <label class="form-label">Portada</label>
            <input id="image" type="string" class="form-control" value="${bookEdit.image}">
          </div>
        </div>`,
        showCancelButton: true,
        confirmButtonText: 'Guardar cambios',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
          const title = (document.getElementById('title') as HTMLInputElement).value;
          const author = (document.getElementById('author') as HTMLInputElement).value;
          const publicationDate = (document.getElementById('publicationDate') as HTMLInputElement).value;
          const genre = (document.getElementById('genre') as HTMLInputElement).value;
          const synopsis = (document.getElementById('synopsis') as HTMLInputElement).value;
          const image = (document.getElementById('image') as HTMLInputElement).value;

          return { title, author,publicationDate, genre, synopsis, image };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const { title, author,publicationDate, genre, synopsis, image } = result.value;
          bookEdit.title = title;
          bookEdit.author = author;
          bookEdit.publicationDate = publicationDate;
          bookEdit.genre = genre;
          bookEdit.synopsis = synopsis;
          bookEdit.image = image;

          this.bookService.editar(bookId, bookEdit).subscribe({
            next: () => {
              Swal.fire({
                title: '¡Libro actualizado!',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000
              });
            },
            error: () => {
              Swal.fire({
                title: 'Oops!',
                text: 'Ha ocurrido un error al actualizar este libro',
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
}