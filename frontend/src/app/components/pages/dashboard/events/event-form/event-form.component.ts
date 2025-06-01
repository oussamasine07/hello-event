import {Component, inject, Input, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {Category} from '../../../../../models/interfaces/category';

import { EventInterface } from '../../../../../models/interfaces/event';
import {CategoryService} from '../../../../../services/category/category.service';
import {NgForOf, NgIf} from '@angular/common';
import {EventForm} from '../../../../../models/types/EventForm-type';
import {EventService} from '../../../../../services/event/event.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent implements OnInit {

  categoryService: CategoryService = inject( CategoryService );
  eventService: EventService = inject( EventService )

  router: Router = inject(Router)

  categories: Category[] = []
  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories
      }
    })

    this.eventService.currentEvent.subscribe({
      next: (eventFom: EventForm) => {
        console.log( eventFom )
        this.eventObj = eventFom;
      }
    })
  }

  eventObj: EventForm = {
    pageTitle: "Add new event",
    type: "create",
    event: {
      id: null,
      name: "",
      description: "",
      place: "",
      eventDate: "",
      numberOfPlaces: 0,
      status: "",
      category_id: ""
    }
  }

  onEventSubmit ( form: FormsModule ) {

    this.eventService.postEvent(this.eventObj).subscribe({
      next: ( event: EventInterface ) => {
        this.eventService.addEvent( event )
      }
    })

    this.eventObj = {
      pageTitle: "Add new event",
      type: "create",
      event: {
        id: null,
        name: "",
        description: "",
        place: "",
        eventDate: "",
        numberOfPlaces: 0,
        status: "",
        category_id: ""
      }
    }

    this.router.navigate(["/dashboard/events"])

  }


  onCancelEditEventClick () {
    this.eventObj = {
      pageTitle: "Add new event",
      type: "create",
      event: {
        id: null,
        name: "",
        description: "",
        place: "",
        eventDate: "",
        numberOfPlaces: 0,
        status: "",
        category_id: ""
      }
    }

    this.router.navigate(["/dashboard/events"])
  }

}




















