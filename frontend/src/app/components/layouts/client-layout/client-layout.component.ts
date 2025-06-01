import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-client-layout',
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css'
})
export class ClientLayoutComponent {

}
