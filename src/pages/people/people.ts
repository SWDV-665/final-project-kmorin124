import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiHandlerProvider } from '../../providers/api-handler/api-handler'
import { DialogHandlerProvider } from '../../providers/dialog-handler/dialog-handler'

/**
 * Generated class for the PeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiHandler: ApiHandlerProvider, public dialogHandler: DialogHandlerProvider) {
    apiHandler.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadPeople();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage');
    this.loadPeople()
  }

  people = []

  errorMessage: string;

  loadPeople() {
    return this.apiHandler.getPeople()
    .subscribe(
      people => this.people = people,
      error => this.errorMessage = <any>error);
  }

  async addPerson() {
    console.log("Adding person -");
    this.dialogHandler.showPersonPrompt()
  }

  async editPerson(venue, index) {
    console.log("Editing Item -");
    this.dialogHandler.showPersonPrompt(venue, index)
  }

  removePerson(id) {
    this.apiHandler.removePerson(id);
  }



}
