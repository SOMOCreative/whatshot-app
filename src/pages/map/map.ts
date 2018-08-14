/**
 * Generated class for the MapPage page.
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZDZmE0muFJq--wUqk-oh8TbpWlPP7mAw"></script>
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { CacheService } from "ionic-cache";

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

import { StringsProvider } from '../../providers/strings/strings';
import { Geolocation } from '@ionic-native/geolocation';

import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
 
  @ViewChild('map') mapElement: ElementRef;
  private map: any;
  private iw: any;
  private NZ: any;
  private geoWatch: any;
  private loading: any;

  private myPosition: any;
  private myPin: any;

  private posts: any;

  constructor(
    private Platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private cache: CacheService,
    private s:StringsProvider,
    private geolocation: Geolocation,
    private remote: RemoteServiceProvider,
    private loadingCtrl: LoadingController,
    private callNumber: CallNumber
  ) {
    this.NZ = new google.maps.LatLng(-43.1608567, 170.6003539);
    this.myPosition = new google.maps.LatLng();
    this.iw = new google.maps.InfoWindow();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    this.loading = this.loadingCtrl.create({
      content: this.s.strings.en.loading.map,
      spinner: this.s.strings.config.spinner
    });
    
    this.loading.present();

    this.Platform.ready().then(() => {
      //fire up the map.
      this.initMap();
    });
  
    let singlePost = this.navParams.get('single');

    if(singlePost){
      this.posts = [this.navParams.get('post')];

      this.addMarkers();
      this.loading.dismiss();
    } else {
      this.getDirectoryPosts();
    }
  }

  initMap(){
    console.log('Map init, innit.');

    //create the map
    let options = {
      center: this.NZ,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.s.Map.mapStyle
    };

    this.map = new google.maps.Map(document.getElementById('map'), options);
    
    this.myPin = new google.maps.Marker({
      icon: this.s.Map.myPin,
      map: this.map
    });
    //this.myPin.setMap(this.map);

    this.geolocation.getCurrentPosition().then((res) => {
      this.updateMe(res);
    }).catch((err) => {
      console.log("-- GEOLOCATION: " + err);
    });

    this.geoWatch = this.geolocation.watchPosition();
    this.geoWatch.subscribe((res)=> {
      //update user location.
      if(this.myPin instanceof google.maps.Marker) {
        this.updateMe(res);
      }
      
    });

  }

  updateMe(res){
    //get the users location.
    this.myPosition = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
    this.myPin.setPosition(this.myPosition);
  }

  getDirectoryPosts(){
    this.remote.getDirectoryPosts().subscribe(data => {
      this.posts = data;
      console.log(data);

      this.addMarkers();
      this.loading.dismiss();
    });
  }

  addMarkers(){
    for(let post of this.posts) {
      if(post.acf.map_pins.length > 0){
        let lat = post.acf.map_pins[0].pin_address.lat,
            lng = post.acf.map_pins[0].pin_address.lng,
            title = post.title.rendered;
      
        post.pin = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: this.map,
          title: title,
          icon: this.s.Map.directoryPin
        });

        post.pin.infoWindowHtml = this.createInfoWindow(post);

        let that = this;

        post.pin.addListener('click', function(){
          that.iw.setContent(this.infoWindowHtml);
          that.iw.open(that.map, this);
        });
      }
    }
  }

  createInfoWindow(post){
    let html = ``;

        html += post.acf.normal_image ? `<img src="${post.acf.normal_image.sizes.app}" />` : ``;
        
        html += `<h3>${post.title.rendered}</h3>`;
        html += post.acf.listing_type ? `<p class="meta-title">${post.acf.listing_type}</p>` : ``;
        
        html += "<table>";

        html += `<tr><td><h6>Address:</h6></td><td><p>${post.acf.map_pins[0].pin_address.address}</p></td></tr>`;
        
        html += post.acf.business_freephone ? `<tr><td><h6>Free Phone:</h6></td><td><p>${post.acf.business_freephone}</p></td></tr>` : ``;
        html += post.acf.business_phone ? `<tr><td><h6>Phone:</h6></td><td><p>${post.acf.business_phone}</p></td></tr>` : ``;
        
        html += post.acf.business_url ? `<tr><td><h6>Website:</h6></td><td><p>${post.acf.business_url}</p></td></tr>` : ``;

        html += post.acf.business_email ? `<tr><td><h6>Email:</h6></td><td><p>${post.acf.business_email}</p></td></tr>` : ``;

        html += "</table>";

    return html;
  }

  clickToCall(number){
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

}
