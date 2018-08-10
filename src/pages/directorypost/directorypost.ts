import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { StringsProvider } from '../../providers/strings/strings';
import { CacheService } from "ionic-cache";

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

  post: any;
  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public remote: RemoteServiceProvider,
    public loadingCtrl: LoadingController,
    public s: StringsProvider,
    public cache: CacheService
  ) {
    this.post = this.navParams.get('post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectorypostPage');

    this.loading = this.loadingCtrl.create({
      content: this.s.strings.en.loading.blog,
      spinner: this.s.strings.config.spinner
    });
    
    //this.loading.present();
  }

  openURL(url){

  }

  openMap(post){

  }

  favourite(post){

  }

  clickToCall(number){
    
  }
}
