import { Component } from '@angular/core';
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
export class AddReviewComponent {
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

    if (this.parametro !== null) {
      this.bookService.getBookById(this.parametro).subscribe({
        next: (response) => {
          this.book = response as Book;
          
          console.log(this.book);
          console.log(response);
        },
        error: () => {},
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
          didClose: () => {
            this.router.navigateByUrl("/me");
          }
        });

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
