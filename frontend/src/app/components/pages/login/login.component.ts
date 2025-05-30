import {Component, inject, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  hidePassword = true;

  router = inject(Router);

  token: string | null = localStorage.getItem("token");

  authService = inject(AuthService)

  loginFormObj = {
    username: "",
    password: ""
  }

  onLoginFormSubmit (form: FormsModule) {
    this.authService.loginClient(this.loginFormObj).subscribe({
      next: (res: string) => {
        localStorage.setItem("token", res)
      }
    })
    this.loginFormObj = {
      username: "",
      password: ""
    }
    this.router.navigate(["/dashboard"])
  }

  ngOnInit() {
    this.authService.redirectIfLoggedIn( this.token )
  }

}
