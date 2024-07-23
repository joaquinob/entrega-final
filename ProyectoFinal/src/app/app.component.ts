import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { BookComponent } from './components/pages/book/book.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HttpClient } from '@angular/common/http';
=======
import { UsuarioComponent } from "./components/pages/perfil/usuario/usuario.component";
>>>>>>> be86af034adfe9e156ce4219eeaf420fcf437ce2

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, BookComponent, NavbarComponent, FooterComponent],
=======
  imports: [RouterOutlet, UsuarioComponent],
>>>>>>> be86af034adfe9e156ce4219eeaf420fcf437ce2
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'ProyectoFinal';
}
