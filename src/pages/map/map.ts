/**
 * Generated class for the MapPage page.
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZDZmE0muFJq--wUqk-oh8TbpWlPP7mAw"></script>
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CacheService } from "ionic-cache";
import { StringsProvider } from '../../providers/strings/strings';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
 
  @ViewChild('map') mapElement: ElementRef;
  private map: any;
  private NZ: any;

  constructor(
    private Platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public cache: CacheService,
    public s:StringsProvider
  ) {
    this.NZ = new google.maps.LatLng(-43.1608567, 170.6003539);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.Platform.ready().then(() => {
      this.initMap();
    });  
  }

  initMap(){
    console.log('Map init, innit.');
    let options = {
      center: this.NZ,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(document.getElementById('map'), options);

  }

}
