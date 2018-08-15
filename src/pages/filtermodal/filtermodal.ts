import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FiltermodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtermodal',
  templateUrl: 'filtermodal.html',
})
export class FiltermodalPage {

  public posts: any;
  public that: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltermodalPage');

    this.posts = this.navParams.get('categories');
    this.that = this.navParams.get('that');
  }
  
  filterMap(){
    this.that.togglePins();
  }

  log(data){
    console.log(data);
  }
}
