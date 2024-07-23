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


  getAllBooks() {
    return this.http.get(this.url)
  }

  getBookById(id: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`})

      return this.http.get(`${this.url}/user/${id}`,{headers})
  }

  addBook(book: Book): Observable<Book> {
   console.log(book)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`})

    return this.http.post<Book>(this.url, book, { headers});
  }

  updateBook(id: string, book: Book): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, book, { headers: this.getAuthHeaders() });
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { headers: this.getAuthHeaders() });

  }
}
