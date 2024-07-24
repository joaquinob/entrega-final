import { Component } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { StationsSectionComponent } from './stations-section/stations-section.component';
import { RouterOutlet } from '@angular/router';
import { FiltrarPipe } from '../../../pipes/filtrar.pipe';
import { Book } from '../../../interfaces/book';
import { FormsModule } from '@angular/forms';
import { AddReviewComponent } from '../book/add-review/add-review.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookComponent, RouterOutlet, FormsModule,FiltrarPipe, AddReviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: Book[] = []
filtro: string = ""


searchText(){}
}
