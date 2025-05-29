import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import {SidebareComponent} from '../sidebare/sidebare.component';

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
export class LayoutComponent {
  isSidenavOpen = true;

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
