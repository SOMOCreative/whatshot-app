/**
 * Generated class for the MapPage page.
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZDZmE0muFJq--wUqk-oh8TbpWlPP7mAw"></script>
 */
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, PopoverController } from 'ionic-angular';
import { CacheService } from "ionic-cache";

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

import { FiltermodalPage } from '../../pages/filtermodal/filtermodal';

import { ConfigProvider } from '../../providers/config/config';
import { Geolocation } from '@ionic-native/geolocation';

import { CallNumber } from '@ionic-native/call-number';
//import { InAppBrowser } from '@ionic-native/in-app-browser';

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
  private categories: any;

  private initialised: boolean = false;

  public  catModel: any;
  public  single:   boolean = false;

  constructor(
    private Platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private cache: CacheService,
    private config: ConfigProvider,
    private geolocation: Geolocation,
    private remote: RemoteServiceProvider,
    private loadingCtrl: LoadingController,
    private callNumber: CallNumber,
    private popoverController: PopoverController
  ) {
    this.NZ = new google.maps.LatLng(-40.900, 172.600);
    this.myPosition = new google.maps.LatLng();
    this.iw = new google.maps.InfoWindow();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    // Wait for platform.
    //this.Platform.ready().then(() => {
      // Fire up the map.
      //this.initMap();
    //});
    this.initMap();

  }

  ionViewWillEnter() {

    this.loading = this.loadingCtrl.create({
      content: this.config.strings.en.loading.map,
      spinner: this.config.strings.config.spinner
    });

    this.loading.present();
    this.getDirectoryPosts();
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

  getDirectoryPosts() {
    // Build categories and catModel.
    this.catModel = new Array();
    this.categories = new Array();

    // Get all directory posts from the remote data source.
    this.remote.getDirectoryPosts().subscribe(data => {
      this.posts = data;
      
      this.remote.getCategories().subscribe(data => {
  
        for(let post of data){
          if(post.total_posts > 0 && post.name !== "DIRECTORY"){
            this.categories.push(post);
            this.catModel[post.id] = { id: post.id, visible: true };
          }
        }
        console.log(this.catModel, this.categories);

        // Add markers.
        this.addMarkers();
      });
    });
  }

  addMarkers() {
    console.log(this.posts);
    let zIndex = 100;

    // For each post add marker and create info window HTML.
    for(let post of this.posts) {

      // Does the post have a location?
      if(post.pin instanceof google.maps.Marker) {
        // We've already set this up... leave it alone.
        this.showPin(post);

        continue;
      }

      if(post.acf.map_pins.length > 0){
        let lat = post.acf.map_pins[0].pin_address.lat,
            lng = post.acf.map_pins[0].pin_address.lng,
            title = post.title.rendered;
      
        let pinIcon = this.config.Map.directoryPin;
        
        for(let cat of this.categories) {
          if(post.directory.includes(cat.id)) {
            pinIcon.fillColor = cat.acf.colour;
          }
        }

        console.log(pinIcon);

        // Create marker.
        post.pin = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          title: title,
          map: this.map,
          icon: pinIcon,
          zIndex: zIndex++
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
    
    // Hide loading overlay.
    this.loading.dismiss();
  }

  clickToCall(number){
    this.config.clickToCall(number);
  }

  showFilterModal(){
    console.log("filter");
    let filterPopover = this.popoverController.create(FiltermodalPage, { categories: this.categories, that: this });
    filterPopover.present();
  }

  public togglePins(){
    // Update visible pins from model.
    for(let post of this.posts){

      // Figure out if pin should be visible base on Category Model.
      let showpin = this.showPin(post);

      //Should the pin be visible?
      if(showpin) {
        //Pin should be visible... Is it already visible?
        if(post.pin.getMap() === null) post.pin.setMap(this.map);
      } else {
        //Pin should be hidden.. Is it already hidden?
        if(post.pin.getMap() !== null) post.pin.setMap(null);
      }

    }

  }

  showPin(post){
    // Figure out if pin should be visible base on Category Model.
    let showpin = false;
    for(let cat of this.catModel){
      if(cat === undefined) continue;
      if(post.directory.includes(cat.id)) {
        showpin = cat.visible;
      }
    }
    return showpin;
  }

}
