import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {routes} from '../../../app.routes';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  hidePassword = true;
  hideConfirmPassword = true;

  router = inject(Router)
  token: string | null = localStorage.getItem("token");

  registerErrors: Record<string, string|string[]> = {};

  authService = inject(AuthService)


  ngOnInit() {
    this.authService.redirectIfLoggedIn( this.token )
  }


  registerFormObj = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  onRegisterSubmit (form: FormsModule) {

    this.authService.registerClient(this.registerFormObj).subscribe({
      next: ( res ) => {
        console.log(res)
        this.router.navigate(["/login"])
      },
      error: (resError: any ) => {
        this.registerErrors = resError.error;
        console.log( this.registerErrors )
      }
    })
  }

  clearFieldError(field: string) {
    // Re-assign a new object so Angular notices the change.
    const lookNew = { ...this.registerErrors };
    delete lookNew[field];
    this.registerErrors = lookNew;
  }
  protected readonly Array = Array;
}





















