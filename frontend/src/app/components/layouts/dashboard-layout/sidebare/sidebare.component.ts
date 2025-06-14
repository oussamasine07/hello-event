import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-sidebare',
  imports: [
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    NgFor
  ],
  templateUrl: './sidebare.component.html',
  styleUrl: './sidebare.component.css'
})
export class SidebareComponent {
  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'analytics', label: 'Analytics', route: '/analytics' },
    { icon: 'people', label: 'Clients', route: '/dashboard/clients' },
    { icon: 'event', label: 'Events', route: '/dashboard/events' },
    { icon: 'category', label: 'Categories', route: '/dashboard/categories' },
    { icon: 'settings', label: 'Settings', route: '/settings' }
  ];
}
