import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { EventInterface } from '../../models/interfaces/event'
import {EventForm} from '../../models/types/EventForm-type';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  httpClient = inject(HttpClient)

  event: Subject<EventInterface> = new Subject<EventInterface>();

  addEvent (event: EventInterface) {
    this.event.next( event );
  }

  getAllEvents (): Observable<EventInterface[]> {
    return this.httpClient.get<EventInterface[]>("http://localhost:8080/events")
  }

  // @ts-ignore
  postEvent (requestBody: EventForm ): Observable<EventInterface> {
    switch (requestBody.type) {
      case "create":
        return this.httpClient.post<EventInterface>("http://localhost:8080/events", requestBody.event)
        break;
      case "update":
        return this.httpClient.put<EventInterface>(`http://localhost:8080/events/${requestBody.event.id}`, requestBody.event)
        break;
    }

  }

}






























