import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url: string = "http://localhost:3000/api/book"
  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  // saco las reservas por id para cada usuario autorizado
  getByUserId(userid: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`})

    return this.http.get(`${this.url}/user/${userid}`,{headers})
    // get autorizado

  }
  getAll(){
    return this.http.get(this.url)
  }
}
