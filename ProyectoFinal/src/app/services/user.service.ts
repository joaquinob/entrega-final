import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';  // Adjust the path according to your folder structure
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'  // This makes sure UserService is available application-wide
})
export class UserService {
 apiUrl: string = "http://localhost:3000/api/users"

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`
    })

    return this.http.get(this.apiUrl, {headers});
  }

  // Fetch a user by ID
  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Update a user's information
  updateUser(user: User): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${user.id}`, user);
  }

  // Delete a user by ID
  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Add a new user
  addUser(user: User): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, user);
  }

  // Edit a user by ID
  editUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}/edit`);
  }
}
