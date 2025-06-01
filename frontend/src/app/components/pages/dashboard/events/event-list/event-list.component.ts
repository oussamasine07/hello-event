import {Component, inject, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {EventService} from '../../../../../services/event/event.service';
import { EventInterface } from '../../../../../models/interfaces/event';
import {Router, RouterLink} from '@angular/router';
import {EventForm} from '../../../../../models/types/EventForm-type';

@Component({
  selector: 'app-event-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    DatePipe,
    RouterLink
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  eventService = inject(EventService)

  events: EventInterface[] = [
    /*
    {
      id: 1,
      name: 'Summer Concert',
      eventDate: new Date('2024-07-15'),
      place: 'Central Park',
      numberOfPlaces: 1000,
      description: 'Annual summer concert featuring local artists'
    },
    {
      id: 2,
      name: 'Tech Conference',
      date: new Date('2024-08-20'),
      place: 'Convention Center',
      numberOfPlaces: 500,
      description: 'Technology and innovation conference'
    }

     */
  ];

  displayedColumns: string[] = ['id', 'name', 'date', 'place', 'numberOfPlaces', 'actions'];

  router: Router = inject(Router)

  ngOnInit() {

    this.eventService.event.subscribe({
      next: (event: EventInterface) => {
        this.events = [...this.events, event]
      }
    })

    this.eventService.getAllEvents().subscribe({
      next: ( events: EventInterface[] ) => {
        this.events = events
      }
    })

  }

  onEditEventClick ( event: EventInterface ) {
    const currentEvent: EventForm = {
      pageTitle: `update ${event.name}`,
      type: "update",
      event
    }
    this.eventService.setCurrentEvent( currentEvent )
    this.router.navigate(["/dashboard/create-event"])
  }

  onDeleteEventClick ( id: number ) {
    this.events = this.events.filter(event => event.id != id )
    this.eventService.deleteEvent( id ).subscribe()
  }

}
























