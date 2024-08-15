import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BlogService } from '../services/blog.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [MatDialogModule,NgxSpinnerModule],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.css'
})
export class DeletePopupComponent {

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: string, private blogService: BlogService, private router: Router,private spinner: NgxSpinnerService) { }
  closeDialog() {
    this.dialog.closeAll();
  }

  deleteBlog() {
    console.log(this.data);
    this.spinner.show();
    this.blogService.deleteBlog(this.data).subscribe(data => {
      if (data != null) {
        this.spinner.hide();
        this.dialog.closeAll();
        this.router.navigateByUrl('/home');
      }
    })
  }
}
