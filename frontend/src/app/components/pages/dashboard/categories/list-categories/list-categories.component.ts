import {Component, inject, Input, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {CategoryFormComponent} from '../category-form/category-form.component';
import {CategoryService} from '../../../../../services/category/category.service';
import {Category} from '../../../../../intefaces/category';
import {CategoryFormType} from '../../../../../models/types/CategoryForm-type';

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
  categories: Category[] = [];

  categoryService = inject(CategoryService)

  displayedColumns: string[] = ['id', 'name', 'actions'];

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: ( categories: Category[] ) => {
        this.categories = categories;
      }
    })
  }

  addCategory ( category: Category ) {
    this.categories = [...this.categories, category];
  }

  @Input() categoryForm: CategoryFormType = {
    type: "create",
    category: {
      id: 0,
      name: ""
    }
  };

  onEditClick ( category: Category ) {
    this.categoryForm = {
      type: "update",
      category: category
    }
  }

  cancelCategory (currenCategory: CategoryFormType) {
    this.categoryForm = currenCategory
  }

  onDeleteClick ( id: number ) {
    this.categories = this.categories.filter(cat => cat.id != id);
    this.categoryService.deleteCategory( id ).subscribe()
  }

}
























