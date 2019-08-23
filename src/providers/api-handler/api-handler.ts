import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

/*
  Generated class for the ApiHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiHandlerProvider {

  venues: any = [];

  workers: any = [];

  people: any = [];

  events: any = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  constructor(public http: HttpClient) {
    console.log('Hello ApiHandlerProvider Provider');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  baseURL = 'https://km-event-server.herokuapp.com'

  //
  //Events
  //

  getEvents(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/events').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getEvent(id): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/events/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  getEventWorkers(id): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/events/:id/workers' + id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addEvent(event) {
    this.http.post(this.baseURL + '/api/events', event).subscribe(res => {
      this.events = res;
      this.dataChangeSubject.next(true);
    })
  }

  editEvent(event) {
    console.log("Editing item = ", event);
    this.http.put(this.baseURL + "/api/events/" + event._id, event).subscribe(res => {
      this.events = res;
      this.dataChangeSubject.next(true);
    })
  }

  removeEvent(id) {
    console.log("#### Remove Item - id - ", id);
    this.http.delete(this.baseURL + "/api/events/" + id).subscribe(res => {
      this.events = res;
      this.dataChangeSubject.next(true);
    })
  }

  //
  //Venues
  //

  getVenues(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/venues').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addVenue(venue) {
    this.http.post(this.baseURL + '/api/venues', venue).subscribe(res => {
      this.venues = res;
      this.dataChangeSubject.next(true);
    })
  }

  editVenue(venue, index) {
    console.log("Editing item = ", venue);
    this.http.put(this.baseURL + "/api/venues/" + venue._id, venue).subscribe(res => {
      this.venues = res;
      this.dataChangeSubject.next(true);
    })
  }
s
  removeVenue(id) {
    console.log("#### Remove Item - id - ", id);
    this.http.delete(this.baseURL + "/api/venues/" + id).subscribe(res => {
      this.venues = res;
      this.dataChangeSubject.next(true);
    })
  }

  //
  // People
  //

  getPeople(): Observable<object[]> {
    return this.http.get(this.baseURL + '/api/people').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addPerson(person) {
    this.http.post(this.baseURL + '/api/people', person).subscribe(res => {
      this.people = res;
      this.dataChangeSubject.next(true);
    })
  }

  editPerson(person, index) {
    console.log("Editing item = ", person);
    this.http.put(this.baseURL + "/api/people/" + person._id, person).subscribe(res => {
      this.people = res;
      this.dataChangeSubject.next(true);
    })
  }

  removePerson(id) {
    console.log("#### Remove Item - id - ", id);
    this.http.delete(this.baseURL + "/api/people/" + id).subscribe(res => {
      this.people = res;
      this.dataChangeSubject.next(true);
    })
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
