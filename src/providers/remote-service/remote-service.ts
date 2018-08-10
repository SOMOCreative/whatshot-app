import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from "ionic-cache";

/*
  RemoteServiceProvider provider.
*/

@Injectable()
export class RemoteServiceProvider {

  private apiUrl:string = "https://www.destination-nz.com/wp-json/wp/v2/";
  private debugTag:string = "-- REMOTE SERVICE: ";

  constructor(public http: HttpClient, public cache: CacheService) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  // Get blog posts endpoint.
  public getPosts(type: string = "posts", page: number = 1) {
    let url = this.apiUrl + type + '?page=' + page;
    let request = this.http.get(url);
    let groupKey = type;

    this.log(url);

    console.log('loading from observable');
    return this.cache.loadFromObservable(url, request, groupKey);
  }

  public getPost(type: string = "posts", id: number) {
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

  getCategories(){
    let url = this.apiUrl + 'directory/';
    let request = this.http.get(url);
    let groupKey = "directory";

    this.log(url);

    return this.cache.loadFromObservable(url, request, groupKey);
  }

  getDirectoryPostsByCategory(id: number, page: number = 1) {
    let url = this.apiUrl + 'directory_post?directory=' + id + (page == -1 ? '&filter[posts_per_page]=-1' : '&page=' + page);
    let request = this.http.get(url);
    let groupKey = "directory-" + id;

    this.log(url);

    return this.cache.loadFromObservable(url, request, groupKey);
  }

  log(url) {
    console.log(this.debugTag + url);
  }
}
