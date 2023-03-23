import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from 'src/app/service/category.service';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  constructor(private categories: CategoryService ,private loginService : LoginService,private sanitizer: DomSanitizer) { }
  categoriesJson :any = [];

  userData : any;

  imageSource : any;


  ngOnInit(): void {
    this.categories.categories().subscribe((data: any) => {
      this.categoriesJson = data;
    },
    (error) => {
      console.log(error);
      Swal.fire('Error !!' ,'Error While loading Category data','error');
    } 
    );
    this.userData = this.loginService.getUser();
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.userData.imageData}`);
  }

}
