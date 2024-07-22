import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form!: FormGroup
  password: string = 'password'

  constructor(private builder: FormBuilder, private router: Router, private authService: AuthService){
    this.form = builder.group({
      'username': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  signUp() {
    this.authService.signup(this.form.value.username, this.form.value.email, this.form.value.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/login')
      },
      error:() => {}
    })
  }
}
