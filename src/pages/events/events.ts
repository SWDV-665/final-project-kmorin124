import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { ApiHandlerProvider } from '../../providers/api-handler/api-handler';
import { DialogHandlerProvider } from '../../providers/dialog-handler/dialog-handler'

import { Calendar } from '@ionic-native/calendar';


/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiHandler: ApiHandlerProvider, public dialogHandler: DialogHandlerProvider, public modal: ModalController, private calendar: Calendar) {
    apiHandler.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadEvents();
    });
  }

  events = []

  errorMessage: string;

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.loadEvents()
  }

  loadEvents() {
    return this.apiHandler.getEvents()
    .subscribe(
      events => this.events = events,
      error => this.errorMessage = <any>error);
  }

  async addEvent() {
    console.log("Adding Item -");
    const modalData = {
      title: "Add Event..."
    }
    const newModal = this.modal.create('ModalEventDialogPage',  { data: modalData });
    newModal.present()
  }

  async infoModal(event) {
    console.log("Adding Item -");
    const modalData = {
      title: "Add Event...",
      name: event.name,
      date: event.date,
      venue: event.venue,
      worker: event.worker
    }
    const newModal = this.modal.create('ModalEventPage',  { data: modalData });
    newModal.present()
  }

  async editEvent(event) {
    console.log("Adding Item -");
    const modalData = {
      title: "Edit Event...",
      _id: event._id,
      name: event.name,
      date: event.date,
      venue: event.venue,
      worker: event.worker
    };
    console.log(modalData);
    const newModal = this.modal.create('ModalEventDialogPage', { data: modalData } );
    newModal.present()
  }

  removeEvent(id) {
    this.apiHandler.removeEvent(id);
  }

  // Ionic Native
  // Adds event to calendar using event information to populate fields
  addEventToCalendar(event) {
    var startDate = new Date(event.date); // beware: month 0 = january, 11 = december
    var endDate = new Date(event.date);
    var title = event.name;
    var eventLocation = event.venue;
    var notes = "";
    var success = function(message) { alert("Success: " + JSON.stringify(message)); };
    var error = function(message) { alert("Error: " + message); };

    console.log(startDate)

    this.calendar.createEventInteractively(title, eventLocation, notes, startDate, endDate);
  }

}

