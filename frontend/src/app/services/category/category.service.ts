import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../intefaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpClient = inject( HttpClient )

  constructor() { }

  getAllCategories (): Observable<Category[]> {
    return this.httpClient.get<Category[]>("http://localhost:8080/categories");
  }

}
