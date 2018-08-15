import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

import { DirectorymapPage } from './../../pages/directorymap/directorymap';
import { ConfigProvider } from '../../providers/config/config';


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider
  ) {
    this.post = this.navParams.get('post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectorypostPage');
    
    if(this.slides) this.slides.startAutoplay();
  }

  openURL(url){
    this.config.openURL(url);
  }

  openMap(){
    this.navCtrl.push(DirectorymapPage, { post: this.post });
  }

  favourite(post){
    this.config.toggleFavourite(post);
  }

  clickToCall(number){
    this.config.clickToCall(number);
  }
}
