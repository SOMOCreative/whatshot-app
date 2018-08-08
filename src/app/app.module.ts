import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

/* Pages */
import { MapPage } from '../pages/map/map';
import { BlogPage } from '../pages/blog/blog';
import { EventsPage } from '../pages/events/events';
import { MynzPage } from '../pages/mynz/mynz';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PostPage } from '../pages/post/post';
import { EventPage } from '../pages/event/event';

import { CacheModule } from 'ionic-cache';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { StringsProvider } from '../providers/strings/strings';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    BlogPage,
    EventsPage,
    MynzPage,
    AboutPage,
    HomePage,
    PostPage,
    EventPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    CacheModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    BlogPage,
    EventsPage,
    MynzPage,
    AboutPage,
    HomePage,
    PostPage,
    EventPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider,
    StringsProvider
  ]
})
export class AppModule {}
