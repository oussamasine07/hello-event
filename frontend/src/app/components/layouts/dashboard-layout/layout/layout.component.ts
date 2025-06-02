import {Component, inject, OnInit} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {SidebareComponent} from '../sidebare/sidebare.component';
import {routes} from '../../../../app.routes';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    RouterOutlet,
    NavbarComponent,
    SidebareComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  isSidenavOpen = true;

  authService = inject(AuthService)
  router: Router = inject( Router )

  token: string | null = localStorage.getItem("token");

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  ngOnInit() {
    // redirect user to login if not authenticated
    this.authService.redirectIfNotLoggedIn(this.token);

    if ( this.authService.getUserRole( this.token ) == "CLIENT" ) {
      this.router.navigate(["/client/profile"]);
    }

  }


}



















