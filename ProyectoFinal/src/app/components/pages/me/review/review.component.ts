import { Component } from '@angular/core';
import { Review } from '../../../../interfaces/review';
import { ReviewsService } from '../../../../services/reviews.service';
import { AuthService } from '../../../../services/auth.service';
import { BookComponent } from '../../book/book.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
reviews : Review[] = [];

constructor(private reviewService: ReviewsService, private authService : AuthService){
  this.reviewService.getByUserId(authService.user!.id).subscribe({
    next: (response)=>{
      this.reviews = response as Review[]
    },
    error: (err)=>{
      console.log("error al obtener las reseñas", err)

    }
  })
}



}