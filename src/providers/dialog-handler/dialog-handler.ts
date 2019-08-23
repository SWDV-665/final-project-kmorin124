import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { ApiHandlerProvider } from '../../providers/api-handler/api-handler'

/*
  Generated class for the DialogHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DialogHandlerProvider {

  constructor(public http: HttpClient, public alertController: AlertController, public apiHandler: ApiHandlerProvider) {
    console.log('Hello DialogHandlerProvider Provider');
  }

  async showVenuePrompt(venue?, index?) {
    const alert = await this.alertController.create({
      title: venue ? 'Edit Venue...' : 'Add Venue...',
      inputs: [
        {
          name: 'name',
          placeholder: 'Venue',
          value: venue ? venue.name : null
        },
        {
          name: 'address',
          placeholder: 'Address',
          value: venue ? venue.address : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Saved -', data);
            if (index !== undefined) {
              venue.name = data.name;
              venue.address = data.address;
              this.apiHandler.editVenue(venue, index)
            }
            else {
              this.apiHandler.addVenue(data)
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async showPersonPrompt(person?, index?) {
    const alert = await this.alertController.create({
      title: person ? 'Edit Person...' : 'Add Person...',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'First Name',
          value: person ? person.firstName : null
        },
        {
          name: 'lastName',
          placeholder: 'Last Name',
          value: person ? person.lastName : null
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Saved -', data);
            if (index !== undefined) {
              person.firstName = data.firstName;
              person.lastName = data.lastName;
              person.phone = data.phone;
              this.apiHandler.editPerson(person, index)
            }
            else {
              this.apiHandler.addPerson(data)
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
