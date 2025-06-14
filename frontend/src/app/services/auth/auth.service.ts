import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import {UserPayloadInterface} from '../../models/interfaces/user-payload-interface';

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
    return this.httpClient.post("http://localhost:8080/user/register", body).pipe(
      catchError( ( err: HttpErrorResponse ) => {
        return throwError(() => err);
      })
    );
  }

  loginClient ( body: loginBody ): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8080/user/login", body).pipe(
      catchError( (err: HttpErrorResponse) => {
        return throwError(() => err);
      })
    );
  }

  redirectIfNotLoggedIn ( token: string | null) {
    if ( !token ) {
      this.router.navigate(["/login"])
    }
  }

  redirectIfLoggedIn ( token: string | null ) {
    if ( token ) {
      switch (this.getUserRole( token )) {
        case "ADMIN":
          this.router.navigate(["/dashboard"])
          break;
        case "CLIENT":
          this.router.navigate(["/client/profile"])
          break;
      }
      this.router.navigate(["/dashboard"])
    }
  }

  getDecodedToken ( token: string | null ) {
    return token ? jwtDecode<UserPayloadInterface>( token ) : null;
  }

  isTokenExpired ( token: string | null ): boolean {
    if (token) {
      const decoded: any = jwtDecode(token)
      const decodedExpDate = decoded.exp;
      const currentDate = Date.now() / 1000;

      return decodedExpDate < currentDate;
    }
    return true;
  }

  getUserRole ( token: string | null ) {
    const decoded: UserPayloadInterface | null = this.getDecodedToken(token);
    return decoded ? decoded.role : null;
  }

}



















