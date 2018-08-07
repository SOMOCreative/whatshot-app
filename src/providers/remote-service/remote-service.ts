import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  RemoteServiceProvider provider.

*/
@Injectable()
export class RemoteServiceProvider {

  apiUrl = "https://www.destination-nz.com/wp-json/wp/v2/";

  constructor(public http: HttpClient) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  // Get blog posts endpoint.
  //!
  getPosts(type: string = "posts", page: number = 1) {
    return this.http.get<any[]>(
      this.apiUrl
      + type
      + '?page=' + page
    );
  }

  getPost(type: string = "posts", id: number) {
    return this.http.get(
      this.apiUrl
      + type
      + "/" + id
    );
  }

  getDirectoryPosts(){

  }

  getDirectoryPost(){

  }

  
}
