import {Component, inject, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDivider
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  authService: AuthService = inject( AuthService )
  router: Router = inject(Router)

  token: string | null = localStorage.getItem("token") ?? localStorage.getItem("token");

  ngOnInit() {
    this.authService.redirectIfNotLoggedIn( this.token )

    if ( this.authService.getUserRole( this.token ) == "ADMIN" ) {
      this.router.navigate(["/dashboard"])
    }

  }

}
