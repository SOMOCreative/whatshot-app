import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { PostPage } from './../post/post';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { StringsProvider } from '../../providers/strings/strings';

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
    public s: StringsProvider
    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BlogPage');

    this.loading = this.loadingCtrl.create({
      content: this.s.strings.en.loading.blog,
      spinner: "crescent"
    });
    
    this.loading.present();
    this.getBlogPosts();
  }

  getBlogPosts(){
    this.remote.getPosts("posts").subscribe(data => {
      console.log(data);

      for(let post of data) {
        // massage posts
        // @TODO: move this to a pipe?
        post.excerpt.rendered = post.excerpt.rendered.replace(/<a.*readmore.*>.*<\/a>/ig, "");
        // @TODO: setup featured image, check ACF fields, etc.

      }

      this.posts = data;
      
      if(this.posts.length < 10) {
        this.morePagesAvailable = false;
      }

      this.loading.dismiss();

    }, err => {
      
      //couldn't get posts, tell the user
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
}
