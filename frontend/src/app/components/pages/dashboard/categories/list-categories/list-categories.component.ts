import {Component, inject, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {CategoryFormComponent} from '../category-form/category-form.component';
import {CategoryService} from '../../../../../services/category/category.service';
import {Category} from '../../../../../intefaces/category';

@Component({
  selector: 'app-list-categories',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    CategoryFormComponent
  ],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListCategoriesComponent implements OnInit {
  categories: Category[] | null | undefined = [];

  categoryService = inject(CategoryService)

  displayedColumns: string[] = ['id', 'name', 'actions'];

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;

        console.log(this.categories)
      }
    })
  }

}
