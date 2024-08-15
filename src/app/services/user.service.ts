import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURL = 'https://blogapplication-az8h.onrender.com';

  public token =  new BehaviorSubject<String>('');
  public userInformation = new Subject<User>();
  
    constructor(private httpService :HttpClient, private router : Router) { }
  
    signup(userbody :User) : Observable<User>{
      return this.httpService.post(this.baseURL + '/user/signup', userbody).pipe(map(data=>{
        return <User>data;
      }));
    }
  
    login(userbody :User) : Observable<User>{
      return this.httpService.post(this.baseURL + '/user/signin', userbody).pipe(map((data :any)=>{
        if(data.message == 'Valid User'){
        var userInformation : User = {
          username : data.user.username,
          email : data.user.email,
          id: data.user._id
        }
        console.log(data.token);
        localStorage.setItem('userInformation', JSON.stringify(userInformation));
        localStorage.setItem('token', JSON.stringify(data.token));
        this.userInformation.next(userInformation);
        console.log(this.userInformation);
      }
        return data;
      }));
    }
  
    getUsername(){
      var userInformation :any = localStorage.getItem('userInformation');
      console.log(JSON.parse(userInformation));
      var parsedUserInfo = JSON.parse(userInformation);
      return parsedUserInfo.username;
    }
  
    getUserId(){
      var userInformation :any = localStorage.getItem('userInformation');
      console.log(JSON.parse(userInformation));
      var parsedUserInfo = JSON.parse(userInformation);
      return parsedUserInfo.id;
    }

    IsUserLoggedIn(): boolean
    {
      var loginCookie :any = localStorage.getItem("token");
      if(loginCookie =='' || loginCookie == null) 
      {
         this.router.navigate(['/']);
         return false;
        
      }
      return true;
    }
}
