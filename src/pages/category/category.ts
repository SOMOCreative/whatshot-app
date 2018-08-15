import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { DirectorypostPage } from './../directorypost/directorypost';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { ConfigProvider } from '../../providers/config/config';
import { CacheService } from "ionic-cache";

/**
 * CategoryPage page.
  */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  cat: any;
  posts: any;
  loading: any;
  morePagesAvailable: boolean = true;
  postType: string = "directory_post";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public remote: RemoteServiceProvider,
    public loadingCtrl: LoadingController,
    public config: ConfigProvider,
    public cache: CacheService
  ) {
    this.cat = this.navParams.get('cat');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');

    this.loading = this.loadingCtrl.create({
      content: this.config.strings.en.loading.blog,
      spinner: this.config.strings.config.spinner
    });
    
    this.loading.present();
    
    this.getCategoryPosts(null);
  }

  getCategoryPosts(refresher){
    this.remote.getDirectoryPostsByCategory(this.cat.id, -1).subscribe(data => {
      if(refresher){
        console.log('refreshing');
      }
     
      console.log(data);

      // massage posts.
      for(let post of data) {
        // @TODO: move this to a pipe?
        //post.excerpt.rendered = post.excerpt.rendered.replace(/<a.*readmore.*>.*<\/a>/ig, "");
        post.acf.phone = post.acf.business_freephone || post.acf.business_phone;
      }

      // set posts object to returned and massaged data.
      this.posts = data;
      
      // disable lazy load if there are less then 10 posts.
      //if(this.posts.length < 10) {
        this.morePagesAvailable = false;
      //}

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

    this.remote.getDirectoryPostsByCategory(this.cat.id, page).subscribe(data => {
      
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
    this.navCtrl.push(DirectorypostPage, { post: post });
  }

  forceReload(refresher){
    let groupKey = "directory-" + this.cat.id;
    this.cache.clearGroup(groupKey).then(() => {
      this.getCategoryPosts(refresher);
    });
  }
}
