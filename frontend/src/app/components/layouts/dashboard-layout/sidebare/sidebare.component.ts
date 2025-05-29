import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-sidebare',
  imports: [
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebare.component.html',
  styleUrl: './sidebare.component.css'
})
export class SidebareComponent {
  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'analytics', label: 'Analytics', route: '/analytics' },
    { icon: 'people', label: 'Users', route: '/users' },
    { icon: 'shopping_cart', label: 'Products', route: '/products' },
    { icon: 'settings', label: 'Settings', route: '/settings' }
  ];
}
