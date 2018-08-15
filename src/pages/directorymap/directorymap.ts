/**
 * Generated class for the DirectorymapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, /*NavController,*/ NavParams, /*Platform,*/ LoadingController } from 'ionic-angular';
//import { CacheService } from "ionic-cache";

//import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

import { ConfigProvider } from '../../providers/config/config';
import { Geolocation } from '@ionic-native/geolocation';

//import { CallNumber } from '@ionic-native/call-number';
//import { InAppBrowser } from '@ionic-native/in-app-browser';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-directorymap',
  templateUrl: 'directorymap.html',
})
export class DirectorymapPage {

  @ViewChild('map') mapElement: ElementRef;
  private map: any;
  private iw: any;
  private NZ: any;
  private geoWatch: any;
  private loading: any;

  private myPosition: any;
  private myPin: any;

  private posts: any;
  //private categories: any;

  private initialised: boolean = false;

  public  catModel: any;
  public  single:   boolean = false;

  constructor(
    //private Platform: Platform,
    //private navCtrl: NavController,
    private navParams: NavParams,
    //private cache: CacheService,
    private config: ConfigProvider,
    private geolocation: Geolocation,
    //private remote: RemoteServiceProvider,
    private loadingCtrl: LoadingController,
    //private callNumber: CallNumber,
    //private modalController: ModalController,
    //private popoverController: PopoverController
  ) {
    this.NZ = new google.maps.LatLng(-40.900, 172.600);
    this.myPosition = new google.maps.LatLng();
    this.iw = new google.maps.InfoWindow();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectoryMapPage');

    this.initMap();
  }

  ionViewWillEnter() {

    this.loading = this.loadingCtrl.create({
      content: this.config.strings.en.loading.map,
      spinner: this.config.strings.config.spinner
    });

    this.posts = [this.navParams.get('post')];
    // Add markers.
    this.addMarkers();

    // Hide loading overlay.
    this.loading.dismiss();    
  }

  initMap() {
    if(this.initialised) return;
    console.log('Map init, innit.');

    // Create the map.
    let options = {
      center: this.NZ,
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: this.config.Map.mapStyle,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false
    };
    this.map = new google.maps.Map(document.getElementById('map'), options);

    // Setup pin for user location.
    this.myPin = new google.maps.Marker({
      icon: this.config.Map.myPin,
      zIndex: 0
    });

    this.geolocation.getCurrentPosition().then((res) => {
      // Wait for first location to add user pin.
      this.myPin.setMap(this.map);
      // Update user location.
      this.updateMe(res);
    }).catch((err) => {
      // Something went wrong? or geo not enabled...
      console.log("-- GEOLOCATION: " + err);
    });

    // Setup geo location watcher.
    this.geoWatch = this.geolocation.watchPosition();
    this.geoWatch.subscribe((res)=> {
      // Update user location.
      if(this.myPin instanceof google.maps.Marker) this.updateMe(res);
    });

    this.initialised = true;
  }

  updateMe(res) {
    //get the users location.
    this.myPosition = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
    this.myPin.setPosition(this.myPosition);
  }

  addMarkers() {
    console.log(this.posts);

    // For each post add marker and create info window HTML.
    for(let post of this.posts) {

      if(post.acf.map_pins.length > 0){
        let lat = post.acf.map_pins[0].pin_address.lat,
            lng = post.acf.map_pins[0].pin_address.lng,
            title = post.title.rendered;
      
        // Create marker.
        post.pin = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          title: title,
          map: this.map,
          icon: this.config.Map.directoryPin
        });

        // Create info window HTML.
        post.pin.infoWindowHtml = this.config.createInfoWindow(post);

        // It's all about context.
        let that = this;

        // Add click-to-open info window.
        post.pin.addListener('click', function(){
          that.iw.setContent(this.infoWindowHtml);
          that.iw.open(that.map, this);
        });
      }
    }
  }
}
