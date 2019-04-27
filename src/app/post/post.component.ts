import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../shared/models/post';
import {UserService} from '../shared/services/user.service';
import {Client} from '../shared/models/client';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  private user: Client;
  @Input() post: Post;
  editMode = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {

    this.user = this.userService.readUser();

  }


  onClickEditPost() {
    this.editMode = true;
  }

}
