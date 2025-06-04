import {Component, inject, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {CommonModule} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {AuthService} from '../../../services/auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import {UserInterface} from '../../../models/interfaces/user';
import {UserService} from '../../../services/user/user.service';
import {Reservation} from '../../../models/interfaces/reservation';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDivider,
    RouterLink
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  authService: AuthService = inject( AuthService )
  userService: UserService = inject( UserService )

  router: Router = inject(Router)

  userProfile: UserInterface | null = null;
  reservations: Reservation[] = [];

  token: string | null = localStorage.getItem("token") ?? localStorage.getItem("token");

  ngOnInit() {
    this.authService.redirectIfNotLoggedIn( this.token )

    if ( this.authService.getUserRole( this.token ) == "ADMIN" ) {
      this.router.navigate(["/dashboard"])
    }

    this.userProfile = this.authService.getDecodedToken( this.token )

    this.userService.getAuthenticatedUserReservations( this.userProfile?.id ).subscribe({
      next: ( reservations: Reservation[] ) => {
        this.reservations = reservations
        console.log(reservations)
      }
    })


  }

}
