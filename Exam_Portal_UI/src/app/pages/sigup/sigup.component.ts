import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-sigup',
  templateUrl: './sigup.component.html',
  styleUrls: ['./sigup.component.css']
})
export class SigupComponent {

  constructor(private userService: UserService, private snack: MatSnackBar, private router: Router) {

  }

  formData = new FormData();
  files: any;

  public user = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profile: 'NORMAL'
  };

  formSubmit() {
    if (this.user.userName == null || this.user.userName == '') {
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

    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        this.uploadImage(data.id);
        Swal.fire('Success Done !!', 'User is Registered with id ' + data.id, 'success');
      },
      (error) => {
        console.log(error);
        this.snack.open(error.error.msg, '', {
          duration: 3000, verticalPosition: 'bottom',
        });
      }
    );
  }
  public resetFiled() {
    this.user.userName = '';
    this.user.password = '';
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.email = '';
    this.user.phone = '';
  }


  public selectFile(event: any) {
    this.formData.append('file', event.target.files[0]);
    this.files = event.target.files[0];
  }


  public uploadImage(userId: any) {
    this.userService.addUserImage(userId, this.formData).subscribe((data: any) => {
      this.router.navigate(['login']);
    },
      (error) => {
        console.log(error);
        this.snack.open(error.error.msg, '', {
          duration: 3000, verticalPosition: 'bottom',
        });
      }
    );

  }

}
