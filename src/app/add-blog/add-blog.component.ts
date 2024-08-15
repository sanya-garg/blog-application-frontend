import { Component } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Blog } from '../classes/blog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [FormsModule, CommonModule, NavBarComponent,NgxSpinnerModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent {
  blog = new Blog('', '','');
  id: string = '';
  uploadedFiles: any;
  
  constructor(private blogService: BlogService, private router: Router,
    private userService: UserService, private route: ActivatedRoute,private spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      if (this.id != null) {
        this.spinner.show();
        this.blogService.getBlogById(this.id).subscribe((data: any) => {
          console.log(data);
          this.blog._id = data.blog._id;
          this.blog.title = data.blog.title;
          this.blog.body = data.blog.body;
          this.spinner.hide();
        })
      }
    });
  }

  onSubmit() {
    console.log(this.blog);
    if (this.id != null) {
      this.spinner.show();
      this.blogService.updateBlog(this.blog).subscribe((data: any) => {
        console.log(data);
        if (data.message = 'Blog updated successfully') {
          this.spinner.hide();
          this.router.navigateByUrl('/home');
        }
      })
    }
    else {
      let formData = new FormData();
      for (var i = 0; i < this.uploadedFiles.length; i++) {
          formData.append("coverImageURL", this.uploadedFiles[i]);
      }
      formData.append("title", this.blog.title);
      formData.append("body", this.blog.body);
      formData.append("createdBy", this.userService.getUserId(),);
      //const formData = new FormData();
     // formData.append('coverImageURL',this.uploadedFiles);
     console.log(this.uploadedFiles[0]);
       console.log(formData.get('coverImageURL'));
       this.spinner.show();
      this.blogService.addNewBlog(this.blog, this.uploadedFiles[0]).subscribe((data: any) => {
        console.log(data);
        if (data.message = 'Blog Created Successfully') {
          this.spinner.hide();
          this.router.navigateByUrl('/home');
        }
      })
    }
  }

  fileChange(element: any){
    this.uploadedFiles = element.target.files;
    console.log(this.uploadedFiles);
  }
}
