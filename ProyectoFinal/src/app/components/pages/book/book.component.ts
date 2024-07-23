import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  //book: Book;

  book: {
    _id: string;
    title: string;
    author: string; //Cambiado a string provisionalmente
    genre: string;  //Cambiado a string provisionalmente
    image: string;
    rating: number;//Cambiado a number provisionalmente
    publicationYear: number;
    synopsis: string; 
  };

  constructor() {
    // SOLO EJEMPLO
    this.book = {
      _id: '1',
      title: 'La casa de los espíritus',
      author: 'Isabel Allende',
      genre: 'Novela - Realismo mágico',
      image: 'https://m.media-amazon.com/images/I/611zbT8CveL._AC_UF894,1000_QL80_.jpg',
      rating: 5,
      publicationYear: 1982,
      synopsis: 'La novela narra la historia de cuatro generaciones de la familia Trueba, desde inicios del siglo XX hasta la década de 1970, con el telón de fondo de diversos episodios de la historia de Chile que se entrecruzan con las experiencias y relatos de los personajes femeninos de Nívea, Clara, Blanca y Alba.'
    };
  }


  public get fullStars() : number[] {
    const stars: number[] = []
    for(let i = 0; i< Math.floor(this.book.rating);i++){
      stars.push(1)
    }
    return stars
  }
  
  ngOnInit(): void {
    
  }

  
}
