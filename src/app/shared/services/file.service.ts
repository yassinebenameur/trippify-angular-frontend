import {GenericService} from './generic.service';
import {Injectable} from '@angular/core';
import {Config} from '../config';
import {UserService} from './user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Client} from '../models/client';

@Injectable()

export class FileService {
  headers: HttpHeaders = new HttpHeaders();


  constructor(private http: HttpClient,
              private userSerivce: UserService) {

  }


  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const headers = this.headers.set('Authorization', 'Bearer ' + this.userSerivce.getToken());

    const url = Config.baseUrl + '/uploadFile';
    return this.http.post<any>(url, formData, {
      headers
    });
  }

}
