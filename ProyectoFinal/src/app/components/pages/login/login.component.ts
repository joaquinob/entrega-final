import { Login } from './../../../interfaces/login';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  password: string = 'password';
  form!: FormGroup;


  constructor(private builder: FormBuilder, private authService: AuthService, private router: Router, private location: Location) {
    this.form = builder.group({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  login() {
    const email: string = this.form.value.email;
    const password: string = this.form.value.password;


    this.authService.login(email, password).subscribe({
      next: (response) => {
        const loginResponse: Login = response as Login;
        const user: User = {
          token: loginResponse.token,
          id: loginResponse.id,
          role: loginResponse.role,
          email: loginResponse.email,
          username: loginResponse.username
        };
console.log(response)
        this.authService.saveUser(user);
        //PARA VOLVER A LA PAGINA ANTERIOR
        this.location.back();
        // backClicked() {
        //   this._location.back();
      },
      error: () => {}
    })
  }
}