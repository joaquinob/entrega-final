import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  confirmLogout() {
    Swal.fire({
      title: "¿Estás seguro que quieres cerrar la sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡salir!",
      cancelButtonText: "Cancelar!",
  
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser();
        Swal.fire({
          title: "¡Cerraste sesión!",
          text: "Esperamos verte pronto",
          icon: "success"
        });
      }
    });
  }
}
