import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Category} from '../../intefaces/category';
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
        return this.httpClient.post<Category>("http://localhost:8080/categories", body)
      case "update":
        return this.httpClient.put<Category>(`http://localhost:8080/categories/${requestBody.category.id}`, body)
    }

  }

  deleteCategory ( id: number ) {
    return this.httpClient.delete(`http://localhost:8080/categories/${id}`);
  }

}
