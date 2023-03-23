import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginData = {
    username: '',
    password: ''
  };
  constructor(private sneak: MatSnackBar, private login : LoginService , private router : Router)  { }


  formSubmit() {
    if (this.loginData.username == null || this.loginData.username.trim() == '') {
      this.sneak.open('User is required !!', '', {
        duration: 3000,
      });
      return;
    }
    if (this.loginData.password == null || this.loginData.password.trim() == '') {
      this.sneak.open('Password is required !!', '', {
        duration: 3000,
      });
      return;
    }
    this.login.generateToken(this.loginData).subscribe(
      (data : any) =>{
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          (user:any) => {
            this.login.setUser(user);
            if(this.login.getUserRole() == 'ADMIN' && this.login.isValidPassword()){
            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole() == 'NORMAL' && this.login.isValidPassword()){
            this.router.navigate(['user-dashboard/0']);
            this.login.loginStatusSubject.next(true); 

            }else{
              this.login.logOut();
             // location.reload();
             this.sneak.open('Invalid Details !!! Try Again','ok',{
              duration :3000, verticalPosition:'bottom',
              })
            }
          }
        )

      },
      (error) =>{
        console.log(error);
        this.sneak.open(error.error.msg,'ok',{
          duration :3000, verticalPosition:'bottom',
          });
      }
    );
  }

  public resetFiled() {
    this.loginData.username = '';
    this.loginData.password = '';
  }

}
