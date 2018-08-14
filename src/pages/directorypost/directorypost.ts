import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Slides } from 'ionic-angular';

import { MapPage } from './../../pages/map/map';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { StringsProvider } from '../../providers/strings/strings';
import { CacheService } from "ionic-cache";

import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';


/**
 * Generated class for the DirectorypostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-directorypost',
  templateUrl: 'directorypost.html',
})
export class DirectorypostPage {

  @ViewChild(Slides) slides: Slides;

  post: any;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public remote: RemoteServiceProvider,
    public loadingCtrl: LoadingController,
    public s: StringsProvider,
    public cache: CacheService,
    private callNumber: CallNumber,
    private inAppBrowser: InAppBrowser
  ) {
    this.post = this.navParams.get('post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectorypostPage');

    this.loading = this.loadingCtrl.create({
      content: this.s.strings.en.loading.blog,
      spinner: this.s.strings.config.spinner
    });
    
    if(this.slides) this.slides.startAutoplay();

    //this.loading.present();
  }

  openURL(url){
    this.inAppBrowser.create(url, "_blank");
  }

  openMap(post){
    this.navCtrl.push(MapPage, { single: true, post: post });
  }

  favourite(post){

  }

  clickToCall(number){
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
