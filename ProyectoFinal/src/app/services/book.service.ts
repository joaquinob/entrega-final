import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url: string = "http://localhost:3000/api/book"
  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const user = this.authService.getUser();
    const token = user ? user.token : null;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // saco las reservas por id para cada usuario autorizado
  getByUserId(userid: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`})

    return this.http.get(`${this.url}/user/${userid}`,{headers})
    // get autorizado

  }


  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url, { headers: this.getAuthHeaders() });
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  addBook(vehicle: Book): Observable<Book> {
    return this.http.post<Book>(this.url, vehicle, { headers: this.getAuthHeaders() });
  }

  updateBook(id: string, vehicle: Book): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, vehicle, { headers: this.getAuthHeaders() });
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getAuthHeaders() });

  }
}
