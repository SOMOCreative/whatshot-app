import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  loading: any;
  post: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public config: ConfigProvider) {
    this.post = this.navParams.get('post');
  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      content: this.config.strings.en.loading.post,
      spinner: "crescent"
    });
    
    //this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

}
