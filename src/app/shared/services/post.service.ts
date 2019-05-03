import {GenericService} from './generic.service';
import {Injectable} from '@angular/core';
import {Config} from '../config';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Client} from '../models/client';
import {Trip} from '../models/trip';
import {Post} from '../models/post';

@Injectable()

export class PostService extends GenericService {


  constructor(private http: HttpClient,
              private userSerivce: UserService) {
    super();
  }


  addPost(post: Post, trip_day_id: number) {
    const headers = this.headers.set('Authorization', 'Bearer ' + this.userSerivce.getToken());
    const url = Config.baseUrlApi + '/post?trip_day_id=' + trip_day_id;
    return this.http.post<any>(url, post, {
      headers
    });
  }

  deletePostById(id: number) {
    const headers = this.headers.set('Authorization', 'Bearer ' + this.userSerivce.getToken());
    const url = Config.baseUrlApi + '/post?id=' + id;
    return this.http.delete<any>(url, {
      headers
    });
  }

}
