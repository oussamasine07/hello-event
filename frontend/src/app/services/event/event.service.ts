import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Event } from '../../models/interfaces/event'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() { }

  httpClient = inject(HttpClient)

  getAllEvents (): Observable<Event[]> {
    return this.httpClient.get<Event[]>("http://localhost:8080/events")
  }

}
