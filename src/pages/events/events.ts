import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import * as moment from 'moment';

import { EventPage } from '../../pages/event/event';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { StringsProvider } from '../../providers/strings/strings';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public remote: RemoteServiceProvider,
    public loadingCtrl: LoadingController,
    public s: StringsProvider
    ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');

    this.loading = this.loadingCtrl.create({
      content: this.s.strings.en.loading.events,
      spinner: "crescent"
    });
    
    this.loading.present();
    this.morePagesAvailable = true;

    this.getEventPosts();    
  }

  getEventPosts(){
    this.remote.getPosts("event_post").subscribe(data => {
      console.log(data);

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

    }, err => {
      
      //couldn't get posts, tell the user
      console.log(err);

    });
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.remote.getPosts("event_post", page).subscribe(data => {
      
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

}
