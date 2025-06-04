import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatAnchor, MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel, MatPrefix, MatSuffix} from '@angular/material/input';
import {NavbarComponent} from '../../layouts/navbar/navbar.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-change-password',
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
    MatFormField,
    MatIcon,
    MatIconButton,
    MatSuffix,
    NavbarComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  hidePassword = true;

  changePasswordObj = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  }
  onChangePasswordForm ( form: FormsModule ) {
    console.log(this.changePasswordObj)


  }

}
