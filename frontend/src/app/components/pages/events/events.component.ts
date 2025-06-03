import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {EventInterface} from '../../../models/interfaces/event';
import {Router, RouterLink} from '@angular/router';
import {EventService} from '../../../services/event/event.service';

@Component({
  selector: 'app-events',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {

  events: EventInterface[] = [];

  router: Router = inject(Router)
  eventService: EventService = inject(EventService)

  ngOnInit() {
    this.eventService.getAllEvents().subscribe({
      next: ( events: EventInterface[] ) => {
        this.events = events
      }
    })
  }

  onReserve(event: EventInterface): void {
    // TODO: Implement reservation logic
    console.log('Reserving event:', event.id);
  }

  onViewDetails(event: EventInterface): void {
    this.router.navigate(['/events', event.id]);
  }
}
