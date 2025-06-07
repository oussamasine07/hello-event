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
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NavbarComponent,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  hidePassword = true;

  router = inject(Router);

  token: string | null = localStorage.getItem("token");

  fieldErrors: Record<string, string|string[]> = {};

  authService = inject(AuthService)

  loginFormObj = {
    username: "",
    password: ""
  }

  onLoginFormSubmit (form: FormsModule) {
    this.authService.loginClient(this.loginFormObj).subscribe({
      next: (res) => {
        localStorage.setItem("token", res.token)

        switch (this.authService.getUserRole( res.token )) {
          case "ADMIN":
            this.router.navigate(["/dashboard"])
            break;
          case "CLIENT":
            this.router.navigate(["/client/profile"])
            break;
        }
        this.loginFormObj = {
          username: "",
          password: ""
        }
      },
      error: (err) => {
        this.fieldErrors = err.error;
        console.log(this.fieldErrors)
      }
    })

  }

  ngOnInit() {
    this.authService.redirectIfLoggedIn( this.token )
  }

  clearFieldError(field: string) {
    // Re-assign a new object so Angular notices the change.
    const lookNew = { ...this.fieldErrors };
    delete lookNew[field];
    this.fieldErrors = lookNew;
  }

}
