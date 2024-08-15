import { Component } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = new User('','');
  message ='';
constructor(private userService: UserService, private router: Router,private spinner: NgxSpinnerService) { }

onSubmit() {
  console.log(this.login);
  this.message='';
  this.login.username= '';
  this.spinner.show();
  this.userService.login(this.login).subscribe((data: any) => {
    console.log(data);
    if(data.message == 'Valid User'){
      this.userService.token.next(data.token);
      console.log(this.userService.token);
      this.spinner.hide();
      this.router.navigateByUrl('/home');
    }
    else{
      this.message = data.message;
    }
    // if (data.message = "User created") {
    //   this.router.navigateByUrl('');
    // }
  })
}

}
