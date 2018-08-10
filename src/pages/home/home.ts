import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { CategoryPage } from './../category/category';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { StringsProvider } from '../../providers/strings/strings';
import { CacheService } from "ionic-cache";


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
    public s: StringsProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Travel Page');

    this.loading = this.loadingCtrl.create({
      content: this.s.strings.en.loading.travel,
      spinner: this.s.strings.config.spinner
    });
    
    this.loading.present();
    
    this.getCategories();
  }

  getCategories(){
    this.remote.getCategories().subscribe(data => {
     
      console.log(data);

      // massage posts.
      for(let post of data) {
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

  viewCategory(event, category){
    this.navCtrl.push(CategoryPage, { cat: category });
    console.log(category);
  }

}
