import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlogPage } from './blog';

import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@NgModule({
  declarations: [
    BlogPage,
    RemoteServiceProvider,
  ],
  imports: [
    IonicPageModule.forChild(BlogPage),
    RemoteServiceProvider,
  ],
})
export class BlogPageModule {

  constructor(public http: RemoteServiceProvider) {

  }
}