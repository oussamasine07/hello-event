import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {EventInterface} from '../../../models/interfaces/event';
import {Router} from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  events: EventInterface[] = [
    {
      id: 1,
      name: 'Summer Concert',
      eventDate: new Date('2024-07-15'),
      place: 'Central Park',
      numberOfPlaces: 1000,
      description: 'Annual summer concert featuring local artists',
      status: "opened",
      category_id: 1
    },
    {
      id: 2,
      name: 'Tech Conference',
      eventDate: new Date('2024-08-20'),
      place: 'Convention Center',
      numberOfPlaces: 500,
      description: 'Technology and innovation conference',
      status: "opened",
      category_id: 2
    },
    {
      id: 3,
      name: 'GiTech',
      eventDate: new Date('2024-08-20'),
      place: 'marakesh stud',
      numberOfPlaces: 500,
      description: 'Technology and innovation conference',
      status: "opened",
      category_id: 2
    }
  ];

  router: Router = inject(Router)

  onReserve(event: EventInterface): void {
    // TODO: Implement reservation logic
    console.log('Reserving event:', event.id);
  }

  onViewDetails(event: EventInterface): void {
    this.router.navigate(['/events', event.id]);
  }
}
