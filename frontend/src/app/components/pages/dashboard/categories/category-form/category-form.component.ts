import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, NgForm} from '@angular/forms';
import {CategoryService} from '../../../../../services/category/category.service';
import {Category} from '../../../../../intefaces/category';

@Component({
  selector: 'app-category-form',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {

  @Output() categoryEventEmitter: EventEmitter<Category> = new EventEmitter();

  categoryServcie = inject(CategoryService);

  categoryObj = {
    name: "",
    type: "create"
  }
  onSubmitCategory ( form: NgForm ) {


    this.categoryServcie.postOrUpdateCategory(this.categoryObj).subscribe({
      next: ( createdCategory: Category ) => {
        this.categoryEventEmitter.emit( createdCategory );
      }
    })

    this.categoryObj = {
      name: "",
      type: "create"
    }
  }
}





















