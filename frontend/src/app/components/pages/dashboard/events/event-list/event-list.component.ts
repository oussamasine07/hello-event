import {Component, inject, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {DatePipe} from '@angular/common';
import {EventService} from '../../../../../services/event/event.service';
import { Event } from '../../../../../models/interfaces/event';
import {RouterLink} from '@angular/router';

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

  events: Event[] = [
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

  ngOnInit() {
    this.eventService.getAllEvents().subscribe({
      next: ( events: Event[] ) => {
        this.events = events
      }
    })
  }
}
























