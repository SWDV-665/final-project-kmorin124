import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventsPage } from '../pages/events/events';
import { VenuesPage } from '../pages/venues/venues';
import { PeoplePage } from '../pages/people/people';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiHandlerProvider } from '../providers/api-handler/api-handler';

import { HttpClientModule } from '@angular/common/http';
import { DialogHandlerProvider } from '../providers/dialog-handler/dialog-handler';

import { Calendar } from '@ionic-native/calendar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventsPage,
    VenuesPage,
    PeoplePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventsPage,
    VenuesPage,
    PeoplePage,    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiHandlerProvider,
    DialogHandlerProvider,
    Calendar
  ]
})
export class AppModule {}
