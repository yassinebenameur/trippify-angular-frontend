import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Config} from '../config';
import {StorageService} from './storage.service';
import {catchError} from 'rxjs/operators';
import {Client} from '../models/client';
import {GenericService} from './generic.service';

@Injectable()
export class UserService extends GenericService {
  loggedClient: Client;

  constructor(private http: HttpClient, private storageService: StorageService) {
    super();
    this.loggedClient = storageService.read(Config.userKey) as Client;
  }


  isLoggedIn() {
    return this.storageService.read(Config.userTokenKey) != null;
  }


  getToken() {
    return this.storageService.read(Config.userTokenKey) as string;
  }


  clear() {
    this.storageService.removeAll();
  }

  storeUserAccessToken(accessToken: string) {
    this.storageService.write(Config.userTokenKey, accessToken);
  }

  storeUser(client: Client) {
    this.storageService.write(Config.userKey, client);
  }

  readUser(): Client {
    return this.storageService.read(Config.userKey);
  }

  me() {
    const headers = this.headers.set('Authorization', 'Bearer ' + this.getToken());
    const url = Config.baseUrlApi + '/user/me';
    return this.http.get<any>(url, {
      headers
    });
  }


}
