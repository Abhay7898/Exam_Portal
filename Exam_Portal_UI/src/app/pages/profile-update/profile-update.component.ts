import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { QuestionService } from 'src/app/service/question.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private snack: MatSnackBar, private routerLink: Router, private login: LoginService, private userService: UserService) { }

  public user: any = null;
  formData = new FormData();
  files: any;
  imageSource: any;
  public base64textString: String = "";

  isLoggedIn = false;


  ngOnInit(): void {
    this.user = this.login.getUser();
    this.user.password = null;
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.user.imageData}`);
    this.isLoggedIn = this.login.isLoggedIn();
    this.login.loginStatusSubject.asObservable().subscribe((data) =>{
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    });

  }


  updateProfileSubmit() {

    if (this.user.username == null || this.user.username == '') {
      this.snack.open('User Name is reqierd!', 'ok', {
        duration: 3000, verticalPosition: 'bottom',
      });
      return;
    }

    if (this.user.password == null || this.user.password == '') {
      this.snack.open('Password is reqierd!', 'ok', {
        duration: 3000, verticalPosition: 'bottom',
      });
      return;
    }

    if (this.user.firstName == null || this.user.firstName == '') {
      this.snack.open('First Name is reqierd!', 'ok', {
        duration: 3000, verticalPosition: 'bottom',
      });
      return;
    }

    if (this.user.lastName == null || this.user.lastName == '') {
      this.snack.open('Last Name is reqierd!', 'ok', {
        duration: 3000, verticalPosition: 'bottom',
      });
      return;
    }

    if (this.user.email == null || this.user.email == '') {
      this.snack.open('Email is reqierd!', 'ok', {
        duration: 3000, verticalPosition: 'bottom',
      });
      return;
    }

    if (this.user.phone == null || this.user.phone == '') {
      this.snack.open('Phone Number is reqierd!', 'ok', {
        duration: 3000, verticalPosition: 'bottom',
      });
      return;
    }

    if (this.user.phone.length > 10) {
      this.snack.open('Phone Number Not > 10 Digit!', 'ok', {
        duration: 3000, verticalPosition: 'bottom',
      });
      return;
    }

    if (this.files == null || this.files == '') {
      this.snack.open('Please select any Image', 'ok', {
        duration: 3000, verticalPosition: 'bottom',
      });
      return;
    }

    var ext = this.files.name.substring(this.files.name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() != 'png' && ext.toLowerCase() != 'jpg') {
      this.snack.open('Selected file format is not supported', 'ok', {
        duration: 3000, verticalPosition: 'bottom',
      });
      return;
    }

    if (this.files.size > 2000000) {
      this.snack.open('Selected file < 2 MB', 'ok', {
        duration: 3000, verticalPosition: 'bottom',
      });
      return;
    }

    Swal.fire({
      title: 'Do you want to Update Profile ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Update',
      denyButtonText: `Don't Update`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.user.imageData = this.base64textString;
        this.userService.updateUser(this.user).subscribe(
          (data: any) => {
            Swal.fire('Success Done !!', 'Profile Updated with id ' + data.id, 'success');
            this.logout();
          },
          (error) => {
            console.log(error);
            this.snack.open(error.error.msg, '', {
              duration: 3000, verticalPosition: 'bottom',
            });
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Profile Update Canceled', '', 'info')
      }

    })
  }

  public selectFile(event: any) {
    this.formData.append('file', event.target.files[0]);
    this.files = event.target.files[0];
    this.handleFileSelect(event);
  }

  handleFileSelect(evt: any) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  public logout() {
    this.login.logOut();
    this.isLoggedIn = false;
    this.user = null;
    window.location.reload();
  }
}
