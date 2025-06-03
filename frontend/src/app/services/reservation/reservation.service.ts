import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  httpClient: HttpClient = inject(HttpClient)

  isEventReserved ( eventId: number | null ) {

  }

  reserveEvent ( eventId: number | null ) {
    return this.httpClient.post("http://localhost:8080/reservation", {
      event_id : eventId
    })
  }

}
