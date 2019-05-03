import {GenericService} from './generic.service';
import {Injectable} from '@angular/core';
import {Config} from '../config';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Client} from '../models/client';
import {Trip} from '../models/trip';

@Injectable()

export class TripService extends GenericService {


  constructor(private http: HttpClient,
              private userSerivce: UserService) {
    super();
  }

  getTripsOfConnectedUser() {
    const headers = this.headers.set('Authorization', 'Bearer ' + this.userSerivce.getToken());
    const url = Config.baseUrlApi + '/trip/me';
    return this.http.get<any>(url, {
      headers
    });
  }

  getTripsFeed(page: number) {
    const headers = this.headers.set('Authorization', 'Bearer ' + this.userSerivce.getToken());
    const url = Config.baseUrlApi + '/trip/paged?page=' + page + '&size=12';
    return this.http.get<any>(url, {
      headers
    });
  }

  getTripsByKeyword(keyword: string) {
    const headers = this.headers.set('Authorization', 'Bearer ' + this.userSerivce.getToken());
    const url = Config.baseUrlApi + '/trip/search?keyword=' + keyword;
    return this.http.get<any>(url, {
      headers
    });
  }

  getTripById(id: string) {
    const headers = this.headers.set('Authorization', 'Bearer ' + this.userSerivce.getToken());
    const url = Config.baseUrlApi + '/trip/' + id;
    return this.http.get<any>(url, {
      headers
    });
  }

  addTrip(trip: Trip) {
    const headers = this.headers.set('Authorization', 'Bearer ' + this.userSerivce.getToken());
    const url = Config.baseUrlApi + '/trip';
    return this.http.post<any>(url, trip, {
      headers
    });
  }

}
