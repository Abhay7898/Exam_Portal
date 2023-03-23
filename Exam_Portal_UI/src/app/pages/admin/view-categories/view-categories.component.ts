import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private categories: CategoryService) { }
  categoriesJson :any = [];

  ngOnInit(): void {
    this.categories.categories().subscribe((data: any) => {
      this.categoriesJson = data;
    },
    (error) => {
      console.log(error);
      Swal.fire('Error !!' ,'Error in loading data','error');
    } 
    );
  }




}
