import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Event Organizer',
      image: 'assets/testimonial1.jpg',
      quote: 'The platform made managing our tech conference seamless and professional.'
    },
    {
      name: 'Michael Chen',
      role: 'Concert Promoter',
      image: 'assets/testimonial2.jpg',
      quote: 'Incredible tool for reaching our audience and selling tickets efficiently.'
    },
    {
      name: 'Emma Davis',
      role: 'Festival Director',
      image: 'assets/testimonial3.jpg',
      quote: 'Best event management platform I\'ve used in my 10 years of experience.'
    }
  ];
}
