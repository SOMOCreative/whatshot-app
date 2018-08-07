import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { StringsProvider } from '../../providers/strings/strings';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public s: StringsProvider) {
    this.post = this.navParams.get('post');
  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      content: this.s.strings.en.loading.post,
      spinner: "crescent"
    });
    
    //this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

}
