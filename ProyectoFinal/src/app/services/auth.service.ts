import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null = null;
  url: string = ' backend ';

  constructor(private http: HttpClient, private cookieService: CookieService) { 
    if (cookieService.check('user')){
      this.user = JSON.parse(cookieService.get('user'))
    }
  }

  signup(username: string, email: string, password: string) {
    return this.http.post(
      `${this.url}/signUp`,
      {
        username: username,
        email: email,
        password: password
      })
  }

  login(username: string, email: string, password: string) {
    return this.http.post(`${this.url}/login`, {
      login: email || username,
      password: password
    })
  }

  saveUser(user: User) {
    this.user = user;
    this.cookieService.set('user', JSON.stringify(user))
  }

  getUser(): User | null {
    if (this.user  === null && this.cookieService.check('user')){
      this.user = JSON.parse(this.cookieService.get('user'))
    }
    return this.user
  }
}
