import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../interfaces/book';
import Swal from 'sweetalert2';
import { ReviewsService } from '../../../../services/reviews.service';
import { FormBuilder, FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../../services/book.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormatDatePipe } from '../../../../pipes/format-date.pipe';
import { Ratings } from '../../../../interfaces/ratings';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormatDatePipe, NgClass],
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
  pageNumbers: number[] = [];

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
      "rating": new FormControl(1, Validators.required)
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
        this.calculatePageNumbers();
        this.updatePaginatedRatings();
      },
      error: () => {
        console.error("Error al obtener reseñas del libro");
      }
    });
  }

  calculatePageNumbers() {
    const totalPages = Math.ceil(this.ratings.length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  updatePaginatedRatings() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    this.paginatedRatings = this.ratings.slice(start, end);
  }

  changePage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.pageNumbers.length) {
      this.currentPage = pageNumber;
      this.updatePaginatedRatings();
    }
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
