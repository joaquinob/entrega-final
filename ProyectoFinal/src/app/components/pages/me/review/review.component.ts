import { BookService } from './../../../../services/book.service';
import { Component } from '@angular/core';
import { Review } from '../../../../interfaces/review';
import { ReviewsService } from '../../../../services/reviews.service';
import { AuthService } from '../../../../services/auth.service';
import { BookComponent } from '../../book/book.component';
import { Ratings } from '../../../../interfaces/ratings';
import Swal from 'sweetalert2';
import { Book } from '../../../../interfaces/book';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
reviews : Ratings[] = [];
books: Book[] = []

constructor(private reviewService: ReviewsService, private authService : AuthService){
  this.reviewService.getByUserId(authService.user!.id).subscribe({
    next: (response)=>{
      this.reviews = response as Ratings[]
      console.log(this.reviews)
      console.log(this.authService.user)
    },
    error: (err)=>{
      console.log("error al obtener las reseñas", err)

    }
  })
}

eliminar(reviewId: string) {
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
      this.reviewService.delete(reviewId).subscribe({
        next: () => {
          Swal.fire({
            title: "¡Reseña eliminada!",
            text: "La reseña ha sido eliminada correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          }).then(function(){location.reload()});

          this.books = this.books.filter(x => x._id !== reviewId);
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



}
