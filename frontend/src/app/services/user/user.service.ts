import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UserInterface } from '../../models/interfaces/user';
import {Observable} from 'rxjs';

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

}
