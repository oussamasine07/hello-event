import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, Subject, throwError} from 'rxjs';
import { EventInterface } from '../../models/interfaces/event'
import {EventForm} from '../../models/types/EventForm-type';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  httpClient = inject(HttpClient)

  event: Subject<EventInterface> = new Subject<EventInterface>();
  eventObj = {
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

  currentEvent: BehaviorSubject<EventForm> = new BehaviorSubject<EventForm>( this.eventObj )

  addEvent (event: EventInterface) {
    this.event.next( event );
  }

  setCurrentEvent (event: EventForm) {
    this.currentEvent.next( event );
  }

  getAllEvents (): Observable<EventInterface[]> {
    return this.httpClient.get<EventInterface[]>("http://localhost:8080/events")
  }

  getEventById ( id: string | null ): Observable<EventInterface> {
    return this.httpClient.get<EventInterface>(`http://localhost:8080/events/${id}`)
  }

  // @ts-ignore
  postEvent (requestBody: EventForm ): Observable<EventInterface> {
    switch (requestBody.type) {
      case "create":
        return this.httpClient.post<EventInterface>("http://localhost:8080/events", requestBody.event).pipe(
          catchError((err: HttpErrorResponse) => {
            return throwError(() => err )
          })
        )
        break;
      case "update":
        return this.httpClient.put<EventInterface>(`http://localhost:8080/events/${requestBody.event.id}`, requestBody.event).pipe(
          catchError((err: HttpErrorResponse) => {
            return throwError(() => err )
          })
        )
        break;
    }

  }


  deleteEvent ( id: number) {
    return this.httpClient.delete(`http://localhost:8080/events/${id}`)
  }

}






























