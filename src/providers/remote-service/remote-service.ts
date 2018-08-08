import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from "ionic-cache";

/*
  RemoteServiceProvider provider.
*/

@Injectable()
export class RemoteServiceProvider {

  private apiUrl:string = "https://www.destination-nz.com/wp-json/wp/v2/";

  constructor(public http: HttpClient, public cache: CacheService) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  // Get blog posts endpoint.
  getPosts(type: string = "posts", page: number = 1) {
    let url = this.apiUrl + type + '?page=' + page;
    let request = this.http.get(url);
    let groupKey = type;

    //delayed observable is nice, but it needs to look like it's doing something! or does it?
    //if(refrehser){
    //  console.log('loading from delayed observable');
    //  return this.cache.loadFromDelayedObservable(url, request, groupKey, null, 'all');
    //} else {
    console.log('loading from observable');
    return this.cache.loadFromObservable(url, request, groupKey);
    //}
/*
    return this.http.get<any[]>(
      this.apiUrl
      + type
      + '?page=' + page
    );
*/
  }

  getPost(type: string = "posts", id: number) {
/*    let url = this.apiUrl + type + "/" + id;
    let request = this.http.get(url);

    return this.cache.loadFromObservable(url, request, type);
*/  
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

  clearCacheGroup(type: string = "posts"){
    this.cache.clearGroup(type);
  }

  clearCacheEntry(type: string = "posts"){

  }

  clearCache(){
    this.cache.clearAll();
  }
}
