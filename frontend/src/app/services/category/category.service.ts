import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, Subject, throwError} from 'rxjs';
import {Category} from '../../models/interfaces/category';
import {CategoryFormType} from '../../models/types/CategoryForm-type';

type categoryBody = {
  name: string,
  type: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpClient = inject( HttpClient )

  category: Subject<Category> = new Subject<Category>();

  constructor() { }

  addCategory (category: Category) {
    this.category.next(category)
  }

  getAllCategories (): Observable<Category[]> {
    return this.httpClient.get<Category[]>("http://localhost:8080/categories");
  }

  // @ts-ignore
  postOrUpdateCategory ( requestBody: CategoryFormType ): Observable<Category> {
    const body = {
      name: requestBody.category.name
    }
    switch (requestBody.type) {
      case "create":
        return this.httpClient.post<Category>("http://localhost:8080/categories", body).pipe(
          catchError((err: HttpErrorResponse) => {
            return throwError(() => err)
          })
        );
      case "update":
        return this.httpClient.put<Category>(`http://localhost:8080/categories/${requestBody.category.id}`, body).pipe(
          catchError((err: HttpErrorResponse) => {
            return throwError(() => err)
          })
        );
    }

  }

  deleteCategory ( id: number ) {
    return this.httpClient.delete(`http://localhost:8080/categories/${id}`);
  }

}
