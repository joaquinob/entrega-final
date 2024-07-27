import { Component, Input } from '@angular/core';
import { User } from '../../../../interfaces/user';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

users! : User[] 
 filtro: string = ""

constructor(private userService : UserService){
  userService.getAllUsers().subscribe({
    next:(response)=>{
      this.users = response as User[]
    },
    error:()=>{}
  })
}

eliminar(userId: string) {
  console.log('Eliminar usuario:', userId);
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás revertir esta acción',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          Swal.fire({
            title: '¡Usuario eliminado!',
            text: 'El usuario ha sido eliminado correctamente',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });

          this.users = this.users.filter(user => user.id !== userId);
        },
        error: () => {
          Swal.fire({
            title: 'Oops!',
            text: 'Ha ocurrido un error',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
  });
}
editar(userId: string) {
  console.log('Editar usuario:', userId); 
  const usuarioEditar: User | undefined = this.users.find(x=> x.id === userId);
  console.log(userId)
  if (usuarioEditar) {
    console.log('Usuario encontrado para editar:', usuarioEditar); 
    Swal.fire({
      title: `Editar usuario ${usuarioEditar.username}`,
      html: `<div>
        <div>
          <label class="form-label">Nombre</label>
          <input id="userName" type="text" class="form-control" value="${usuarioEditar.username}">
        </div>
        <div>
          <label class="form-label">Correo electrónico</label>
          <input id="userEmail" type="email" class="form-control" value="${usuarioEditar.email}">
        </div>
        <div>
          <label class="form-label">Rol</label>
          <input id="userRole" type="text" class="form-control" value="${usuarioEditar.role}">
        </div>
      </div>`,
      showCancelButton: true,
      confirmButtonText: 'Guardar cambios',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const userName = (document.getElementById('userName') as HTMLInputElement).value;
        const email = (document.getElementById('userEmail') as HTMLInputElement).value;
        const role = (document.getElementById('userRole') as HTMLInputElement).value;
        return { userName, email, role };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { userName, email, role } = result.value;
        this.userService.updateUser(userId, { userName, email, role }).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Usuario actualizado!',
              text: 'El usuario ha sido actualizado correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
            usuarioEditar.username = userName;
            usuarioEditar.email = email;
            usuarioEditar.role = role;
          },
          error: () => {
            Swal.fire({
              title: 'Oops!',
              text: 'Ha ocurrido un error al actualizar el usuario',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  } else {
    console.error('No se encontró el usuario a editar');
  }
}
}
