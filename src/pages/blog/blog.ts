import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { PostPage } from './../post/post';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { StringsProvider } from '../../providers/strings/strings';
import { CacheService } from "ionic-cache";


/**
 * Generated class for the BlogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html',
})
export class BlogPage {

  posts: any;
  loading: any;
  morePagesAvailable: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public remote: RemoteServiceProvider,
    public loadingCtrl: LoadingController,
    public s: StringsProvider,
    public cache: CacheService
    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogPage');

    this.loading = this.loadingCtrl.create({
      content: this.s.strings.en.loading.blog,
      spinner: "crescent"
    });
    
    this.loading.present();
    
    this.getBlogPosts(null);
  }

  getBlogPosts(refresher) {
    this.remote.getPosts("posts", 1).subscribe(data => {
      if(refresher){
        console.log('refreshing');
        this.cache.clearGroup("posts");
      }
     
      // massage posts.
      for(let post of data) {
        // @TODO: move this to a pipe?
        post.excerpt.rendered = post.excerpt.rendered.replace(/<a.*readmore.*>.*<\/a>/ig, "");
      }

      // set posts object to returned and massaged data.
      this.posts = data;
      
      // disable lazy load if there are less then 10 posts.
      if(this.posts.length < 10) {
        this.morePagesAvailable = false;
      }

      // hide loading overlay.
      this.loading.dismiss();
      if(refresher) refresher.complete();
      
    }, err => {
      
      //couldn't get posts, tell the user.
      console.log(err);

    });
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.remote.getPosts("posts", page).subscribe(data => {
      
      for(let post of data){
        if(!loading) {
          infiniteScroll.complete();
        }

        this.posts.push(post);
        loading = false;
      }

    }, err => {
      
      // Error? We've probably run out of posts.
      console.log(err);
      this.morePagesAvailable = false;

    });
  }

  viewPost(event, post){
    this.navCtrl.push(PostPage, { post: post });
  }

  forceReload(refresher){
    this.getBlogPosts(refresher);
  }
  
}
