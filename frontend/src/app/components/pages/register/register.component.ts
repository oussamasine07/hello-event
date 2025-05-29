import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
export class RegisterComponent {
  hidePassword = true;
  hideConfirmPassword = true;

  router = inject(Router)

  authService = inject(AuthService)
  registerFormObj = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: ""
  }

  onRegisterSubmit (form: FormsModule) {

    this.authService.registerClient(this.registerFormObj).subscribe({
      next: ( res ) => {
        console.log(res)
      }
    })

    this.registerFormObj = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: ""
    }

    this.router.navigate(["/login"])
  }

}





















