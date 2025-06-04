import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserInterface } from '../../models/interfaces/user';
import {Observable} from 'rxjs';
import {Reservation} from '../../models/interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient = inject(HttpClient);

  constructor() { }

  getAllClients () : Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>("http://localhost:8080/admin/clients");
  }

  deleteClient (id: number ) {
    return this.httpClient.delete(`http://localhost:8080/admin/clients/${ id }`);
  }

  getAuthenticatedUserReservations ( userId: number | null | undefined): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`http://localhost:8080/reservation/${ userId }`)
  }

  updateProfile ( body: any ): Observable<string> {
    return this.httpClient.put(
      "http://localhost:8080/user/update-profile",
      body,
      {
        responseType: "text"
      }
    );
  }

  changePassword ( body: any ): Observable<any> {
    return this.httpClient.put("http://localhost:8080/user/change-password", body);
  }

}
