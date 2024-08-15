import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { Blog } from '../classes/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {
  userId: string | undefined = '';
  blogs: Blog[] = [];
  username: string = '';
  constructor(private blogService: BlogService, private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute) {
    console.log('sanya');
    this.userService.userInformation.subscribe(data => {
      console.log(data);
      this.userId = data.id;
      console.log(this.userId);
    });
  }

  ngOnInit() {
    // this.userService.userInformation.subscribe(data =>{
    //   console.log(data);
    //   // this.userId = data.id;
    //   // console.log(this.userId);
    // });
    this.getAllBlogs();
  }
  getAllBlogs() {
    this.blogService.getAllBlogs().subscribe((data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.blogs = data.blog;
        console.log(this.blogs);
        this.username = this.userService.getUsername();
      }
    })
  }
  showBlogDetails(blogData : Blog){
    this.router.navigateByUrl('/blog-detail/' + blogData._id,{state:{blog:blogData}})
  }
}
