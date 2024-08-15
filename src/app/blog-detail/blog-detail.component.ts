import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../classes/blog';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { BlogService } from '../services/blog.service';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, NavBarComponent,MatDialogModule,NgxSpinnerModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
  blogData :any;
  id :string ='';
  blob: any;
  imageUrl: string | ArrayBuffer | null = '';

  constructor(private route: ActivatedRoute, private router :Router,private blogService : BlogService,private dialog: MatDialog,private spinner: NgxSpinnerService) { 
    // this.blogData = this.router.getCurrentNavigation()?.extras.state;
    // console.log(this.blogData);
     
  }
  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.blogService.getBlogById(this.id).subscribe(data =>{
        if(data!=null){
              this.blogService.getBlogImage(this.id).subscribe((blob : any) =>{
              const url = URL.createObjectURL(blob);
              this.imageUrl = url;
              console.log(this.imageUrl);
              this.blogData = data;
              this.spinner.hide();
            })
          }
       })
      console.log(this.id);
    });
}

updateBlog(){
  this.router.navigate(['/add-blog',{id : this.id }]);
}

openPopup() {
  this.dialog.open(DeletePopupComponent,{
    data : this.id
  });
}
}
