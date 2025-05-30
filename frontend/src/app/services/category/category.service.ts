import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Category} from '../../intefaces/category';

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
  postOrUpdateCategory ( body: categoryBody ): Observable<Category> {

    switch (body.type) {
      case "create":
        return this.httpClient.post<Category>("http://localhost:8080/categories", body)
      case "update":
        return this.httpClient.put<Category>("http://localhost:8080/categories", body)
    }

  }

}
