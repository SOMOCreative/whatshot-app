import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';
import { FavouriteProvider } from '../../providers/favourite/favourite';


/**
 * Generated class for the MynzPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mynz',
  templateUrl: 'mynz.html',
})
export class MynzPage {

  posts: any;
  loading: any;
  haveFavourites: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public config: ConfigProvider,
    public favourite: FavouriteProvider,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MynzPage');
  }

  ionViewWillEnter(){
    this.loading = this.loadingCtrl.create({
      content: this.config.strings.en.loading.mynz,
      spinner: this.config.strings.config.spinner
    });
    
    this.loading.present();

    this.favourite.getAllFavourites().then(data => {
      console.log(data);
      
      if(data && data.length > 0) {
        this.posts = data;
        this.haveFavourites = true;
      } else {
        this.posts = [];
        this.haveFavourites = false;
      }

      this.loading.dismiss();
    });
  }

  clearFavourites() {
    let alert = this.alertCtrl.create({
      title: 'Clear Favourites',
      subTitle: 'Warning this action will clear of your favourites and cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { console.log('Cancel')}
        },
        {
          text: 'OK',
          handler: () => {
            console.log('clear favourites');
            this.favourite.clearAll();
            this.posts = [];
            this.haveFavourites = false;
          }
        }
      ]
    });
    alert.present();
  }

}
