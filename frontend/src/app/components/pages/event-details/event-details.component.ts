import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-event-details',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {

  event = {
    id: 1,
    name: 'Summer Concert',
    description: 'Join us for an unforgettable evening of music under the stars! Our annual summer concert features an incredible lineup of local artists and international performers. Experience a diverse range of musical genres, from classical masterpieces to contemporary hits, all while enjoying the beautiful surroundings of Central Park. This year\'s event promises to be our biggest yet, with special guest appearances and surprise performances throughout the evening.',
    place: 'Central Park',
    eventDate: new Date('2024-07-15T19:00:00'),
    numberOfPlaces: 1000,
    status: 'Available',
    category_id: 1
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // In a real app, we would fetch the event details using the ID from the route
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Event ID:', id);
  }

  onReserve() {
    // TODO: Implement reservation logic
    console.log('Reserving event:', this.event.id);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'available':
        return '#10b981'; // green
      case 'limited':
        return '#f59e0b'; // yellow
      case 'sold out':
        return '#ef4444'; // red
      default:
        return '#64748b'; // gray
    }
  }

}
