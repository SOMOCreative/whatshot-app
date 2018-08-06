import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { MynzPage } from '../mynz/mynz';
import { BlogPage } from '../blog/blog';
import { EventsPage } from '../events/events';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  eventsRoot = EventsPage;
  mapRoot = MapPage;
  homeRoot = HomePage;
  blogRoot = BlogPage;
  mynzRoot = MynzPage;

  constructor() {

  }
}
