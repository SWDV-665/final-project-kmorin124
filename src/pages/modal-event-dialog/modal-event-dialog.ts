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

  ionViewDidLoad() {
    console.log('ionViewDidLoad VenuesPage');
    this.loadVenues();
    this.loadPeople();
  }

  loadVenues() {
    return this.apiHandler.getVenues()
    .subscribe(
      venues => this.venues = venues,
      error => this.errorMessage = <any>error);
  }

  testLog(id, name, date, venue, workers) {
    console.log(id, name, date, venue, workers)
  }


  loadPeople() {
    return this.apiHandler.getPeople()
    .subscribe(
      people => this.people = people,
      error => this.errorMessage = <any>error);
  }

  loadEventWorkers(id) {
    return this.apiHandler.getEventWorkers(this.data._id)
    .subscribe(
      people => this.people = people,
      error => this.errorMessage = <any>error);
  }

  closeModal() {
    console.log('Closing modal')
    this.view.dismiss()
  }

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
