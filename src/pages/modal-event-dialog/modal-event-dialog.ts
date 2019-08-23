import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ApiHandlerProvider } from '../../providers/api-handler/api-handler'

/**
 * Generated class for the ModalEventDialogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-event-dialog',
  templateUrl: 'modal-event-dialog.html',
})
export class ModalEventDialogPage {

  data: any;
  venues = [];
  people: any = [];
  worker: String;

  event: {};

  errorMessage: String;

  name: String;
  venue: String;
  date: String;


  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, public apiHandler: ApiHandlerProvider) {
    this.data = this.navParams.get('data');
    this.date = this.data.date,
    this.venue = this.data.venue,
    this.name = this.data.name,
    this.worker = this.data.worker
  }

  // Load people and venues on page load
  ionViewDidLoad() {
    console.log('ionViewDidLoad VenuesPage');
    this.loadVenues();
    this.loadPeople();
  }

  // Api call returnes venues and adds to venues list
  loadVenues() {
    return this.apiHandler.getVenues()
    .subscribe(
      venues => this.venues = venues,
      error => this.errorMessage = <any>error);
  }


  // Api call returns people and adds to peoople list
  loadPeople() {
    return this.apiHandler.getPeople()
    .subscribe(
      people => this.people = people,
      error => this.errorMessage = <any>error);
  }

  // Api call returns the worker of an event by event id
  loadEventWorkers(id) {
    return this.apiHandler.getEventWorkers(this.data._id)
    .subscribe(
      people => this.people = people,
      error => this.errorMessage = <any>error);
  }

  // Closes current view
  closeModal() {
    console.log('Closing modal')
    this.view.dismiss()
  }

  // Creates a new event
  addEvent(name, date, venue) {
    const event = {
      name: name,
      date: date,
      venue: venue
    }
    console.log(this.name, this.date, this.venue),
    console.log(event)
    this.apiHandler.addEvent(event);
    this.closeModal()
  }

  // Edits and existing event
  editEvent(id, name, date, venue, worker) {
    const event = {
      _id: id,
      name: name,
      date: date,
      venue: venue,
      worker: worker,
    }
    console.log(event)
    this.apiHandler.editEvent(event);
    this.closeModal();
  }

}
