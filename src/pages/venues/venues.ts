import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {  ApiHandlerProvider } from '../../providers/api-handler/api-handler'
import { DialogHandlerProvider } from '../../providers/dialog-handler/dialog-handler'

/**
 * Generated class for the VenuesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-venues',
  templateUrl: 'venues.html',
})
export class VenuesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiHandler: ApiHandlerProvider, public dialogHandler: DialogHandlerProvider) {
    apiHandler.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadVenues();
    });
  }

  venues = []

  errorMessage: string;


  ionViewDidLoad() {
    console.log('ionViewDidLoad VenuesPage');
    this.loadVenues()
  }

  loadVenues() {
    return this.apiHandler.getVenues()
    .subscribe(
      venues => this.venues = venues,
      error => this.errorMessage = <any>error);
  }

  async addVenue() {
    console.log("Adding Item -");
    this.dialogHandler.showVenuePrompt()
  }

  async editVenue(venue, index) {
    console.log("Editing Item -");
    this.dialogHandler.showVenuePrompt(venue, index)
  }

  removeVenue(id) {
    this.apiHandler.removeVenue(id);
  }



}
