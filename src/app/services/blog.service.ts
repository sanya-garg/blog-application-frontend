import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { Observable, map } from 'rxjs';
import { Blog } from '../classes/blog';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseURL = 'https://blogapplication-az8h.onrender.com';
  private httpHeaders: HttpHeaders;
  constructor(private httpService : HttpService, private userService : UserService, private http : HttpClient) { 
    this.httpHeaders = new HttpHeaders;
  }

  getAllBlogs() : Observable<Blog[]>{
    var requestBody = {
      createdBy : this.userService.getUserId()
    }
   // this.httpHeaders = this.httpHeaders.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.httpService.post(this.baseURL + '/blog/getAllBlog', requestBody).pipe(map(data =>{
      return <Blog[]>data;
    }))
  }

  addNewBlog(blogData : any, file :any) : Observable<Blog>{
    blogData.createdBy = this.userService.getUserId();
    console.log(blogData);
    const formDataToSend = new FormData();
    formDataToSend.append('coverImageURL', file);
    for (const key in blogData) {
      if (blogData.hasOwnProperty(key)) {
        formDataToSend.append(key, blogData[key]);
      }
    }
    console.log(formDataToSend.get('coverImageURL'));
    console.log(formDataToSend.get('title'));
    // const requestBody = {
    //   title : blogData.title,
    //   body : blogData.body,
    //   createdBy : this.userService.getUserId(),
    //   coverImageURL : coverImageURL
    // }
    //console.log(requestBody);
    return this.http.post(this.baseURL + '/blog/addBlog', formDataToSend).pipe(map(data =>{
      return <Blog> data;
    }))
  }

  getBlogById(id :string){
    return this.httpService.get(this.baseURL + '/blog/getBlog/' +id).pipe(map(data =>{
      return <Blog> data;
    }))
  }

  updateBlog(blogData :Blog){
    var requestBody = {
      id : blogData._id,
      title : blogData.title,
      body : blogData.body,
    }
    return this.httpService.post(this.baseURL + '/blog/updateBlog', requestBody).pipe(map(data =>{
      return <Blog> data;
    }))
  }

  deleteBlog(id :string){
    var requestBody = {
      id : id
    }
    return this.httpService.post(this.baseURL + '/blog/deleteBlog', requestBody).pipe(map(data =>{
      return <Blog> data;
    }))
  }

  getBlogImage(id : string){
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get(this.baseURL + '/getBlogImage/' +id, {responseType : 'blob'}).pipe(map(data =>{
      console.log(data);
      return data;
    }))
  }
}
