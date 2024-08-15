import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path :'', component :LoginComponent},
    {path :'signup', component : SignupComponent},
    {path : 'home' , component :HomeComponent, canActivate: [AuthGuard]},
    {path :'blog', component :BlogsComponent},
    {path : 'add-blog', component : AddBlogComponent, canActivate: [AuthGuard]},
    {path : 'blog-detail/:id', component : BlogDetailComponent, canActivate: [AuthGuard]}
];
