import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';  // Adjust the path according to your folder structure

@Injectable({
  providedIn: 'root'  // This makes sure UserService is available application-wide
})
export class UserService {
  private apiUrl = 'https://your-api-url.com/users';  // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all users
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Fetch a user by ID
  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Update a user's information
  update(user: User): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/${user.id}`, user);
  }

  // Delete a user by ID
  delete(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Add a new user (optional, if needed)
  add(user: User): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.apiUrl, user);
  }
}
