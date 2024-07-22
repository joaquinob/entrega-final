import { Component } from '@angular/core';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent {
  user: {
    _id: string;
    username: string;
    email: string; //Cambiado a string provisionalmente
    
    image: string;
    
  };

  constructor() {
    // SOLO EJEMPLO
    this.user = {
      _id: '1',
      username: 'La casa de los espíritus',
     email: 'Isabel Allende',
      image: 'https://m.media-amazon.com/images/I/611zbT8CveL._AC_UF894,1000_QL80_.jpg',
  
    };
  }


  
  

}
