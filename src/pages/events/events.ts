import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import * as moment from 'moment';

import { EventPage } from '../../pages/event/event';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { StringsProvider } from '../../providers/strings/strings';
import { CacheService } from "ionic-cache";


/**
 * EventsPage page.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  posts: any;
  loading: any;
  morePagesAvailable: boolean = true;
  postType: string = "event_post";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public remote: RemoteServiceProvider,
    public loadingCtrl: LoadingController,
    public s: StringsProvider,
    public cache: CacheService
    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');

    this.loading = this.loadingCtrl.create({
      content: this.s.strings.en.loading.events,
      spinner: this.s.strings.config.spinner
    });
    
    this.loading.present();
    this.morePagesAvailable = true;

    this.getEventPosts(null);    
  }

  getEventPosts(refresher){
    this.remote.getPosts(this.postType).subscribe(data => {
      if(refresher){
        console.log('refreshing');
      }

      for(let post of data) {
        // massage posts
        if(post.acf.repeater_dates && post.acf.repeater_dates[0].start_date) {
          post.start_date = moment(post.acf.repeater_dates[0].start_date, "YYYYMMDD").format("DD MMMM YYYY");
        }
        if(post.acf.repeater_dates && post.acf.repeater_dates[0].end_date) {
          post.end_date = moment(post.acf.repeater_dates[0].end_date, "YYYYMMDD").format("DD MMMM YYYY");
        }

      }

      this.posts = data;

      if(this.posts.length < 10) {
        this.morePagesAvailable = false;
      }

      this.loading.dismiss();
      if(refresher) refresher.complete();

    }, err => {
      
      //couldn't get posts, tell the user
      console.log(err);

    });
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.remote.getPosts(this.postType, page).subscribe(data => {
      
      for(let post of data){
        if(!loading) {
          infiniteScroll.complete();
        }

        this.posts.push(post);
        loading = false;
      }

    }, err => {
      
      // Error? We've probably run out of posts.
      console.log(err);
      this.morePagesAvailable = false;

    });
  }

  viewPost(event, post){
    this.navCtrl.push(EventPage, { post: post });
  }

  forceReload(refresher){
    this.cache.clearGroup(this.postType).then(() => {
      this.getEventPosts(refresher);
    });
  }

}
