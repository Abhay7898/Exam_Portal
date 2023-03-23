import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-r-user',
  templateUrl: './view-r-user.component.html',
  styleUrls: ['./view-r-user.component.css']
})
export class ViewRUserComponent implements OnInit {

  public user: any = null;
  imageSource: any;
  uId: any;

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.uId = this.router.snapshot.params['uid'];
    this.userService.getSingalUser(this.uId).subscribe((data: any) => {
      this.user = data;
      this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.user.imageData}`);
    },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading User data', 'error');
      })
  }
}  