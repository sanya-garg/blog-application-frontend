import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../classes/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signup = new User('', '', '');

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    console.log(this.signup);
    this.userService.signup(this.signup).subscribe((data: any) => {
      console.log(data);
      if (data.message = "User created") {
        this.router.navigateByUrl('');
      }
    })
  }
}
