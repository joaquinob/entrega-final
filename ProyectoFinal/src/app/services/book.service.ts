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
    const user = this.authService.getUserCookie();
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

// obtener todos
  getAllBooks() {
    return this.http.get(this.url)
  }
// obtener expecifico
  getBookById(id: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`})

      return this.http.get(`${this.url}/${id}`,{headers})
  }
// añadir
  addBook(book: Book): Observable<Book> {
   console.log(book)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`})

    return this.http.post<Book>(this.url, book, { headers});
  }

  
// eliminar libro
  deleteBook(bookId: string){
    const headers= new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`})
  
    return this.http.delete(`${this.url}/${bookId}`,{headers});
  }
  
  // editar
editar(bookId: string, bookEdit: Book){
  const headers= new HttpHeaders({
    'Authorization': `Bearer ${this.authService.user?.token}`
  })
  return this.http.put(`${this.url}/${this.authService.user?.id}/${bookId}`, {bookEdit}, {headers});
  
}
}
