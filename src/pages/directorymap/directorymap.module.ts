import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectorymapPage } from './directorymap';

@NgModule({
  declarations: [
    DirectorymapPage,
  ],
  imports: [
    IonicPageModule.forChild(DirectorymapPage),
  ],
})
export class DirectorymapPageModule {}
