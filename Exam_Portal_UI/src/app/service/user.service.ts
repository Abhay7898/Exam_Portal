import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  public addUser(user : any){
    return this.http.post(`${baseUrl}/user/`,user);
  }


  public getAllUsers(){
    return this.http.get(`${baseUrl}/user/all-users`);
  }

  public updateUser(user : any){
    return this.http.post(`${baseUrl}/user/update_user`,user);

  }

  public addUserImage(userId : any,formData : any){
    console.log(formData);
    return this.http.post<File>(`${baseUrl}/user/image/${userId}`,formData);
  }

  public getSingalUser(uid : any){
    return this.http.get(`${baseUrl}/user/one/${uid}`);
  }
}
