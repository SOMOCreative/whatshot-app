import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';
import { FavouriteProvider } from '../../providers/favourite/favourite';

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
  isFavourite: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public config: ConfigProvider,
    public favourite: FavouriteProvider
  ) {
    this.post = this.navParams.get('post');
  }

  ionViewWillEnter() {
    this.loading = this.loadingCtrl.create({
      content: this.config.strings.en.loading.post,
      spinner: "crescent"
    });
    //this.loading.present();
    
    this.favourite.isFavourite(this.post).then(isFav => {
      this.isFavourite = isFav;
      console.log('is favourite? ', isFav);
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostPage');
  }

  addFavourite() {
    this.favourite.addFavourite(this.post).then(() => {
      this.isFavourite = true;
    });
  }

  removeFavourite() {
    this.favourite.removeFavourite(this.post).then(() => {
      this.isFavourite = false;
    });
  }

}
