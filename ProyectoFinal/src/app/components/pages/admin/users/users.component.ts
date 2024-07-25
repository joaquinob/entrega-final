import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces/user';  // Updated import path
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, AuthService]  // Ensure services are provided
})
export class UsersComponent implements OnInit {
  user: User = {
    id: '',
    username: '',
    email: '',
    token: '',
    role: ''
  };
  users: User[] = [];
  isAdmin: boolean = false;

  constructor(
    private userService: UserService, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.checkIfAdmin();
    if (this.isAdmin) {
      this.getAllUsers();
    }
  }

  checkIfAdmin(): boolean {
    const currentUser = this.authService.getUser();
    return currentUser?.role === 'admin'; // Assuming role 'admin' represents an administrator
  }

  getAllUsers() {
    this.userService.getAll().subscribe((res: User[]) => {
      this.users = res;
    });
  }

  editUser(id: string) {
    this.userService.getById(id).subscribe((res: User) => {
      this.user = res;
    });
  }

  updateUser() {
    this.userService.update(this.user).subscribe((res: { message: string }) => {
      alert(res.message);
      this.getAllUsers();
    });
  }

  deleteUser(id: string) {
    const isDelete = confirm("Estas seguro que quieres borrar?");
    if (isDelete) {
      this.userService.delete(id).subscribe((res: { message: string }) => {
        alert(res.message);
        this.getAllUsers();
      });
    }
  }
}
