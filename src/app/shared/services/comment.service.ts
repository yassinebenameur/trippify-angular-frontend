import {GenericService} from './generic.service';
import {Injectable} from '@angular/core';
import {Config} from '../config';
import {UserService} from './user.service';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {Client} from '../models/client';
import {Trip} from '../models/trip';
import {Post} from '../models/post';
import {Comment} from '../models/comment';


@Injectable()

export class CommentService extends GenericService {


  constructor(private http: HttpClient,
              private userSerivce: UserService) {
    super();
  }


  addComment(comment: Comment, post_id: number) {
    const headers = this.headers.set('Authorization', 'Bearer ' + this.userSerivce.getToken());
    const url = Config.baseUrlApi + '/post/comment?post_id=' + post_id;
    return this.http.post<any>(url, comment, {
      headers
    });
  }

}
