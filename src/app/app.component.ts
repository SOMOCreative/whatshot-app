import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';

import { TabsPage } from '../pages/tabs/tabs';
import { StringsProvider } from '../providers/strings/strings';
import { CacheService } from "ionic-cache";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public http: HttpClient, public s: StringsProvider, cache: CacheService) {
    platform.ready().then(() => {
      //start geolocation

      //setup cache
      cache.setDefaultTTL(60 * 60);
      cache.setOfflineInvalidate(false);


      //check storage for favourits
      //check storage for package data

      statusBar.styleDefault();
      splashScreen.hide();

    });
  }

}
