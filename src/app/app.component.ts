import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Geolocation } from '@ionic-native/geolocation';
//import { HttpClient } from '@angular/common/http';

import { TabsPage } from '../pages/tabs/tabs';
//import { ConfigProvider } from '../providers/config/config';
import { CacheService } from "ionic-cache";
import { RemoteServiceProvider } from "../providers/remote-service/remote-service";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any = TabsPage;
  
  public posts: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    //http: HttpClient,
    //config: ConfigProvider,
    cache: CacheService,
    public remote: RemoteServiceProvider
  ) {
    platform.ready().then(() => {

      //setup cache
      cache.setDefaultTTL(60 * 60 * 12);
      cache.setOfflineInvalidate(false);

      statusBar.styleDefault();
      splashScreen.hide();

      this.remote.getCategories().subscribe(data => {
        // set posts object to returned and massaged data.
        this.posts = new Array();

        for(let post of data){
          if(post.id !== 13) {
            this.posts.push(post);
          }
        }
        //this.posts = data;
        // hide loading overlay.
        //this.loading.dismiss();
      }, err => {
        //couldn't get posts, tell the user.
        console.log(err);
      });      

    });
  }
}
