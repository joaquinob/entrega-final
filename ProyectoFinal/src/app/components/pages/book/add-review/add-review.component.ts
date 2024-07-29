import { Component, OnInit } from '@angular/core';
import { Book } from '../../../../interfaces/book';
import Swal from 'sweetalert2';
import { ReviewsService } from '../../../../services/reviews.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../../services/book.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormatDatePipe } from '../../../../pipes/format-date.pipe';
import { Ratings } from '../../../../interfaces/ratings';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormatDatePipe],
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  ratings: Ratings[] = [];
  parametro: string | null = null;
  book!: Book;
  form!: FormGroup;

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
      console.log(this.parametro);
    });
  }

  ngOnInit() {
    if (this.parametro !== null) {
      this.bookService.getBookById(this.parametro).subscribe({
        next: (response) => {
          this.book = response as Book;
          console.log(this.book);
          console.log(response);

          // Obtener reseñas del libro
          this.reviewService.getBookReviews(this.parametro!).subscribe({
            next: (reviewsResponse) => {
              this.ratings = reviewsResponse as Ratings[];
              console.log(this.ratings);
            },
            error: () => {
              console.error("Error al obtener reseñas del libro");
            }
          });
        },
        error: () => {
          console.error("Error al obtener el libro");
        },
      });
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
          //background: "url('https://img.freepik.com/vector-gratis/ninos-leyendo-ilustracion_114360-8533.jpg?t=st=1722224924~exp=1722228524~hmac=9d785cf6761eff273da1f33bd28c354ef33b8a6331f64b10aa746a6664c3f3bf&w=1380')"
          // didClose: () => {
          //   this.router.navigateByUrl("/me");
          // }
        }).then(function(){location.reload()});

      },
      error: () => {
        Swal.fire({
          title: "Oops",
          text: "Ha ocurrido un error con tu reseña",
          icon: "error",
          timer: 2000,
          showCloseButton: false
        });
      }
    });
  }
}
