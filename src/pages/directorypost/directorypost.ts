import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

import { DirectorymapPage } from './../../pages/directorymap/directorymap';
import { ConfigProvider } from '../../providers/config/config';
import { FavouriteProvider } from '../../providers/favourite/favourite';

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
  public isFavourite: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public favourite: FavouriteProvider
  ) {
    this.post = this.navParams.get('post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectorypostPage');

    if(this.slides) this.slides.startAutoplay();

    this.favourite.isFavourite(this.post).then(isFav => {
      this.isFavourite = isFav;
      console.log('is favourite? ', isFav);
    });

  }

  openURL(url) {
    this.config.openURL(url);
  }

  openMap() {
    this.navCtrl.push(DirectorymapPage, { post: this.post });
  }

  clickToCall(number) {
    this.config.clickToCall(number);
  }

  toggleFavourite() {
    //this.favourite.toggleFavourite(this.post);
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

  kill(){
    console.log('kill favs');
    this.favourite.kill();
  }

}
