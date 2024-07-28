import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllUsers() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`
    })

    return this.http.get(this.url, {headers});
  }

  updateUser(userId: string, userData: any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.patch(`${this.url}/update/${userId}`, userData, { headers });
  }

  deleteUser(userId: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.user?.token}`,
    });
    return this.http.delete(`${this.url}/${userId}`, { headers });
  }
}