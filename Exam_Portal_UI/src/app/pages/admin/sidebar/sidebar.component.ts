import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private loginService : LoginService,private sanitizer: DomSanitizer) { }

  categoriesJson :any = [];

  userData : any;

  imageSource : any;


  ngOnInit(): void {
    this.userData = this.loginService.getUser();
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.userData.imageData}`);
  }
  

  

}
