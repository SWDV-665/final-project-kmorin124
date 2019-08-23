import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEventPage } from './modal-event';

@NgModule({
  declarations: [
    ModalEventPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEventPage),
  ],
})
export class ModalEventPageModule {}
