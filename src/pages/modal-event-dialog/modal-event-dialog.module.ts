import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalEventDialogPage } from './modal-event-dialog';

@NgModule({
  declarations: [
    ModalEventDialogPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalEventDialogPage),
  ],
})
export class ModalEventDialogPageModule {}
