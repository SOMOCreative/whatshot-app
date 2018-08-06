import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MynzPage } from './mynz';

@NgModule({
  declarations: [
    MynzPage,
  ],
  imports: [
    IonicPageModule.forChild(MynzPage),
  ],
})
export class MynzPageModule {}
