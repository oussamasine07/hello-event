import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatInput, MatLabel, MatPrefix, MatSuffix} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {AuthService} from '../../../services/auth/auth.service';
import {UserService} from '../../../services/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-profile',
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    ReactiveFormsModule
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit {

  router: Router = inject(Router);

  token: string | null = localStorage.getItem("token");

  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);



  ngOnInit() {
    const loggedinUser =  this.authService.getDecodedToken( this.token );
    if ( this.token ) {
      this.updateProfileObj = {
        firstName: loggedinUser?.firstName || "",
        lastName: loggedinUser?.lastName || "",
        username: loggedinUser?.username || "",
        email: loggedinUser?.email || ""
      }
    }
  }

  updateProfileObj = {
    firstName: "",
    lastName: "",
    username: "",
    email: ""
  }
  onUpdateProfileSubmit ( form: FormsModule) {

    this.userService.updateProfile( this.updateProfileObj ).subscribe({
      next: ( token: string ) => {
        console.log(token)
        this.token = token;
        localStorage.setItem("token", token )

        this.router.navigate(["/client/profile"])

        this.updateProfileObj = {
          firstName: "",
          lastName: "",
          username: "",
          email: ""
        }
      }
    });


  }


}
