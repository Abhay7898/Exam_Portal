import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {

  constructor(private userService: UserService) { }


  registeredAllUsers: any = [];


  ngOnInit(): void {
    this.loadAllUsersData()
  }





  public loadAllUsersData() {

    this.userService.getAllUsers().subscribe((data: any) => {
      this.registeredAllUsers = data;
    },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading All Users data', 'error');
      })
  }

  public deletUser(userId: any) {

  }
}
