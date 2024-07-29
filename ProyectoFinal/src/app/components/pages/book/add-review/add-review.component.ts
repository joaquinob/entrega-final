import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../interfaces/book';
import Swal from 'sweetalert2';
import { ReviewsService } from '../../../../services/reviews.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../../services/book.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Ratings } from '../../../../interfaces/ratings';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgClass],
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  ratings: Ratings[] = [];
  paginatedRatings: Ratings[] = [];
  parametro: string | null = null;
  book!: Book;
  form!: FormGroup;
  currentPage = 1;
  itemsPerPage = 5;
  averageRating = 0;
  filledStars: number[] = [];
  emptyStars: number[] = [];
  hoverRating = 0;

  constructor(
    private reviewService: ReviewsService,
    private bookService: BookService,
    private builder: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = builder.group({
      "review": new FormControl("", [Validators.required]),
      "rating": new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5)])
    });

    this.route.paramMap.subscribe((params) => {
      this.parametro = params.get('id');
    });
  }

  ngOnInit() {
    if (this.parametro !== null) {
      this.bookService.getBookById(this.parametro).subscribe({
        next: (response) => {
          this.book = response as Book;
          this.loadRatings();
        },
        error: () => {
          console.error("Error al obtener el libro");
        },
      });
    }
  }

  loadRatings() {
    this.reviewService.getBookReviews(this.parametro!).subscribe({
      next: (reviewsResponse) => {
        this.ratings = reviewsResponse as Ratings[];
        this.calculateAverageRating();
      },
      error: () => {
        console.error("Error al obtener reseñas del libro");
      }
    });
  }

  calculateAverageRating() {
    if (this.ratings.length > 0) {
      const totalRating = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
      this.averageRating = totalRating / this.ratings.length;
      this.filledStars = Array(Math.floor(this.averageRating)).fill(0);
      this.emptyStars = Array(5 - Math.floor(this.averageRating)).fill(0);
    } else {
      this.averageRating = 0;
      this.filledStars = Array(0).fill(0);
      this.emptyStars = Array(5).fill(0);
    }
  }
  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }

  setHoverRating(rating: number) {
    this.hoverRating = rating;
  }

  setRating(rating: number) {
    this.form.patchValue({ rating });
  }

  enviar() {
    this.reviewService.addReview(this.book!._id, this.form.value.rating, this.form.value.review).subscribe({
      next: () => {
        Swal.fire({
          title: "Reseña realizada",
          text: `Tu reseña de ${this.book?.title} está lista`,
          icon: "success",
          timer: 2000,
        }).then(() => {
          this.loadRatings();
        });
      },
      error: () => {
        Swal.fire({
          title: "Oops",
          text: "Ha ocurrido un error con tu reseña",
          icon: "error",
          timer: 2000,
        });
      }
    });
  }

 
}
