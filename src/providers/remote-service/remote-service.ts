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
  getBlogPosts(page: number = 1) {
    return this.http.get(
      this.apiUrl
      + 'posts?page=' + page
    );
  }

/*
  getBlogPosts(page: number = 1) {
    return new Promise(resolve => {
      this.http.get(
        this.apiUrl
        + 'posts?page=' + page
      ).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
*/

  getBlogPost(id){
    this.http.get(
      this.apiUrl
      + 'posts/'
      + id
    );
  }

  getDirectoryPosts(){

  }

  getDirectoryPost(){

  }

  
}
