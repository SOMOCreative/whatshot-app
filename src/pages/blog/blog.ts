import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { PostPage } from './../post/post';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { ConfigProvider } from '../../providers/config/config';
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
  postType: string = "posts";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public remote: RemoteServiceProvider,
    public loadingCtrl: LoadingController,
    public config: ConfigProvider,
    public cache: CacheService
    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogPage');

    this.loading = this.loadingCtrl.create({
      content: this.config.strings.en.loading.blog,
      spinner: this.config.strings.config.spinner
    });
    
    this.loading.present();
    
    this.getBlogPosts(null);
  }

  getBlogPosts(refresher) {
    this.remote.getPosts(this.postType).subscribe(data => {
      if(refresher){
        console.log('refreshing');
      }
     
      // massage posts.
      for(let post of data) {
        this.massagePost(post);
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

    this.remote.getPosts(this.postType, page).subscribe(data => {
      
      for(let post of data){
        if(!loading) {
          infiniteScroll.complete();
        }
        
        this.massagePost(post);
        this.posts.push(post);
        loading = false;
      }

    }, err => {
      
      // Error? We've probably run out of posts.
      console.log(err);
      this.morePagesAvailable = false;

    });
  }

  viewPost(post){
    this.navCtrl.push(PostPage, { post: post });
  }

  forceReload(refresher){
    this.cache.clearGroup(this.postType).then(() => {
      this.getBlogPosts(refresher);
    });
  }
  
  massagePost(post){
    //post.excerpt.rendered = post.excerpt.rendered.replace(/<a.*readmore.*>.*<\/a>/ig, "");
    post.excerpt = this.config.excerpt(this.config.stripTags(post.content.rendered), 200, "...");
  }

}
