import {Component, inject, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {NavbarComponent} from '../../layouts/navbar/navbar.component';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NavbarComponent
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
      next: (token: string) => {
        localStorage.setItem("token", token)

        switch (this.authService.getUserRole( token )) {
          case "ADMIN":
            this.router.navigate(["/dashboard"])
            break;
          case "CLIENT":
            this.router.navigate(["/client/profile"])
            break;
        }

      }
    })
    this.loginFormObj = {
      username: "",
      password: ""
    }

  }

  ngOnInit() {
    this.authService.redirectIfLoggedIn( this.token )
  }

}
