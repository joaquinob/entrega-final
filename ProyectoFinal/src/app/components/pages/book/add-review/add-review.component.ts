import { Component } from '@angular/core';
import { Book } from '../../../../interfaces/book';
import Swal from 'sweetalert2';
import { ReviewsService } from '../../../../services/reviews.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../../../services/book.service';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Review } from '../../../../interfaces/review';
import { FormatDatePipe } from '../../../../pipes/format-date.pipe';

@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,FormatDatePipe ],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent {
  parametro: string | null = null;
  book!: Book 
  form! : FormGroup

constructor(private reviewService: ReviewsService,
  private bookService: BookService,
  private builder: FormBuilder,
  public authService: AuthService,
  private router: Router,
  private route: ActivatedRoute
){
  let data: Review = {rating: 0, review: ""}
  this.form = builder.group({
    "review": new FormControl("",[Validators.required]),
    "rating": new FormControl(0,Validators.required)
  });
  route.paramMap.subscribe((params) => {
    this.parametro = params.get('id');
  });
  if (this.parametro !== null) {
    bookService.getByUserId(this.parametro).subscribe({
      next: (response) => {
        this.book = response as Book;
      },
      error: () => {},
    });
  }
}

enviar(){
  this.reviewService.addReview(this.book!._id, this.form.value.review,this.form.value.rating).subscribe({
    next:()=>{
      Swal.fire({
        title: "Reseña realizada",
        text: `tu reseña de ${this.book?.title} esta lista`,
        icon: "success",
        timer:2000,
        didClose: ()=> {
          this.router.navigateByUrl("me/my-bookings")}
        })
      
        // console.log("reserva realizada")
  
      },
      error: () =>{
        Swal.fire({
          title: "Oops",
          text: "Ha ocurrido un error con tu reseña",
          icon: "error",
          timer: 2000,
           showCloseButton: false
        })
      }
    })
   }
    
}
