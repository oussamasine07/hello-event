import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, NgForm} from '@angular/forms';
import {CategoryService} from '../../../../../services/category/category.service';
import {Category} from '../../../../../models/interfaces/category';
import {CategoryFormType} from '../../../../../models/types/CategoryForm-type';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-category-form',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {

  @Output() categoryEventEmitter: EventEmitter<Category> = new EventEmitter();

  categoryServcie = inject(CategoryService);

  fieldErrors: Record<string, string|string[]> = {};

  @Input() currentCategory: CategoryFormType = {
    type: "create",
    category: {
      id: null,
      name: ""
    }
  }

  onSubmitCategory ( form: NgForm ) {

    this.categoryServcie.postOrUpdateCategory(this.currentCategory).subscribe({
      next: ( createdCategory: Category ) => {
        if (this.currentCategory.type == "create") {
          this.categoryEventEmitter.emit( createdCategory );
        }
        this.currentCategory = {
          type: "create",
          category: {
            id: null,
            name: ""
          }
        }
      },
      error: (err) => {
        this.fieldErrors = err.error;
        console.log(this.fieldErrors)
      }
    })

  }

  @Output() cancelCurrentCategory: EventEmitter<CategoryFormType> = new EventEmitter();
  onCancelCurrentCategory () {
    const currentcategory: CategoryFormType = {
      type: "create",
      category: {
        id: null,
        name: ""
      }
    }

    this.cancelCurrentCategory.emit(currentcategory)
  }

  clearFieldError(field: string): void {
    if (this.fieldErrors[field]) {
      delete this.fieldErrors[field];
    }
  }

}





















