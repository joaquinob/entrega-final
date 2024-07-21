import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ResenaLibro {
  titulo: string;
  resena: string;
}

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  usuario: string = 'JohnDoe';
  fotoUrl: string = 'path_to_photo.jpg'; // replace with actual photo path
  resenas: ResenaLibro[] = [
    { titulo: 'Libro 1', resena: 'Reseña para libro 1.' },
    { titulo: 'Libro 2', resena: 'Reseña para libro 2.' } 
  ];

  nuevoTituloLibro: string = '';
  nuevaResenaLibro: string = '';

  anadeRese() {
    if (this.nuevoTituloLibro && this.nuevaResenaLibro) {
      this.resenas.push({ titulo: this.nuevoTituloLibro, resena: this.nuevaResenaLibro });
      this.nuevoTituloLibro = '';
      this.nuevaResenaLibro = '';
    }
  }
}
