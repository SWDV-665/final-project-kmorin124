import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiHandlerProvider } from '../../providers/api-handler/api-handler'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public apiHandler: ApiHandlerProvider) {
  }

  events = []

  errorMessage: string;

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.loadEvents();
  }

  loadEvents() {
    return this.apiHandler.getEvents()
    .subscribe(
      events => this.events = events,
      error => this.errorMessage = <any>error);
  }

}
