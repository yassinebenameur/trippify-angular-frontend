import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Post} from '../shared/models/post';
import {UserService} from '../shared/services/user.service';
import {Client} from '../shared/models/client';
import {Comment} from '../shared/models/comment';
import {CommentService} from '../shared/services/comment.service';


declare let jQuery: any;


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public user: Client;
  @Input() post: Post;
  editMode = false;
  comment = new Comment();

  constructor(private userService: UserService,
              private commentService: CommentService) {
  }

  ngOnInit() {

    this.user = this.userService.readUser();
    console.log(this.post);
    jQuery('.js-zoom-gallery').each(function () {
      jQuery(this).magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
          enabled: true
        },
        removalDelay: 500, //delay removal by X to allow out-animation
        callbacks: {
          beforeOpen: function () {
            // just a hack that adds mfp-anim class to markup
            this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
            this.st.mainClass = 'mfp-zoom-in';
          }
        },
        closeOnContentClick: true,
        midClick: true
      });
    });
  };


  onClickEditPost() {
    this.editMode = true;
  }

  onCommentSubmit() {

    this.commentService.addComment(this.comment, this.post.id).subscribe(
      (data) => {
        this.post = data;
        this.comment = new Comment();
      }, () => {

      }
    );

  }

}
