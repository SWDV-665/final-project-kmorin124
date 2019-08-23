import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ApiHandlerProvider } from '../../providers/api-handler/api-handler'

/**
 * Generated class for the ModalEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-event',
  templateUrl: 'modal-event.html',
})
export class ModalEventPage {

  data: any;


  errorMessage: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiHandler: ApiHandlerProvider, private view: ViewController) {
    this.data = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalEventPage');
  }

  closeModal() {
    console.log('Closing modal')
    this.view.dismiss()
  }

}
