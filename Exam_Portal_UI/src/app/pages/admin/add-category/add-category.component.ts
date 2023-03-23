import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {


  constructor(private sneak: MatSnackBar, private categorySer: CategoryService) { }
  category: any = {

    title: '',
    description: ''
  };

  public formSubmit() {
    if (this.category.title == null || this.category.title.trim() == '') {
      this.sneak.open('Title is required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.category.description == null || this.category.description.trim() == '') {
      this.sneak.open('Description is required !!', '', {
        duration: 3000,
      });
      return;
    }

    this.categorySer.addCategory(this.category).subscribe(
      (data: any) => {
        this.category.title = '';
        this.category.description = '';
        Swal.fire('Success !!', 'Category is added successfuly with id ' + data.cid, 'success');

      },
      (error) => {
        Swal.fire('Failed !!', 'Category is added failed','error');

      });

  }

}
