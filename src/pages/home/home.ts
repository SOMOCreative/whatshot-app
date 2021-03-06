import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { CategoryPage } from './../category/category';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { ConfigProvider } from '../../providers/config/config';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: any;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public remote: RemoteServiceProvider,
    public loadingCtrl: LoadingController,
    public config: ConfigProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Travel Page');

    this.loading = this.loadingCtrl.create({
      content: this.config.strings.en.loading.travel,
      spinner: this.config.strings.config.spinner
    });
    
    this.loading.present();
    
    this.getCategories();
  }

  getCategories(){
    this.remote.getCategories().subscribe(data => {
     
      // massage posts.
      // Remove DIRECTORY category.
      data.splice(data.findIndex(item => {return item.name === "DIRECTORY"}), 1);
      for(let post of data) {
        // Remove any category with no posts.
        if(post.total_posts === 0){
          data.splice(data.findIndex(item => {return item.id === post.id}), 1);
        }
      }

      // set posts object to returned and massaged data.
      this.posts = data;

      // hide loading overlay.
      this.loading.dismiss();
      
    }, err => {
      
      //couldn't get posts, tell the user.
      console.log(err);

    });
  }

  viewCategory(category){
    this.navCtrl.push(CategoryPage, { cat: category });
  }

}