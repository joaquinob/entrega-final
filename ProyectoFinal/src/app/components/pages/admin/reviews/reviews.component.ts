import { Component } from '@angular/core';
import { Review } from '../../../../interfaces/review';
import { ReviewsService } from '../../../../services/reviews.service';
import { AuthService } from '../../../../services/auth.service';
import { Ratings } from '../../../../interfaces/ratings';
import { BookService } from '../../../../services/book.service';
import { Book } from '../../../../interfaces/book';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
ratings: Ratings[] = [];
books: Book[] = []

 

constructor(private reviewService: ReviewsService
){
  reviewService.getAll().subscribe({
    next:(response)=>{
      this.ratings = response as Ratings[] 
    },
    error:(error)=>{
      console.log("Error al obtener las reseñas", error)
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
          });

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
