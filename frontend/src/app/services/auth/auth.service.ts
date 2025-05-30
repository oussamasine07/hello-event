import { Injectable, inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

type registerBody = {
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  password: string
}

type loginBody = {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient)

  router = inject(Router)

  constructor() { }

  registerClient (body: registerBody) {
    return this.httpClient.post("http://localhost:8080/user/register", body);
  }

  loginClient ( body: loginBody ): Observable<string> {
    console.log(body)
    return this.httpClient.post("http://localhost:8080/user/login", body, { responseType: 'text'});
  }

  redirectIfNotLoggedIn ( token: string | null) {
    if ( !token ) {
      this.router.navigate(["/login"])
    }
  }

  redirectIfLoggedIn ( token: string | null ) {
    if ( token ) {
      this.router.navigate(["/dashboard"])
    }
  }

}



















