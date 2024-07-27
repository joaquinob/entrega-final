import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  url: string = "http://localhost:3000/api/review"
  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  // saco las reservas por id para cada usuario autorizado
  getByUserId(userid: string){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`})

    return this.http.get(`${this.url}/user/${userid}`,{headers})
    

  }


  addReview(bookId: string, rating: number, review: string) {
    const body = JSON.stringify({
      rating, review
    });
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`,
      'Content-Type': 'application/json'  // Añadir Content-Type
    })
  
    return this.http.post(`${this.url}/${bookId}`, body, { headers });
  

}

getAll(){
  return this.http.get(this.url)
}
delete(reviewId: string){
  const headers= new HttpHeaders({
    'Authorization': `Bearer ${this.authService.user?.token}`})

  return this.http.delete(`${this.url}/${reviewId}`,{headers});
}

}