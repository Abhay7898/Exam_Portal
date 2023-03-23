import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

public user:any = null;
imageSource : any;

constructor(private login : LoginService,private sanitizer: DomSanitizer){}

  ngOnInit(): void {

    this.user = this.login.getUser();
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.user.imageData}`);
  }


}
