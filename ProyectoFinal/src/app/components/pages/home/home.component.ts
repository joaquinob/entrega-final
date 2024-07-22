import { Component } from '@angular/core';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
