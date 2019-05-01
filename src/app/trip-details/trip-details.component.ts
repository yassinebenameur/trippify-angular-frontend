import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Trip} from '../shared/models/trip';
import {TripService} from '../shared/services/trip.service';
import {Utils} from '../shared/utils';
import {Post} from '../shared/models/post';
import {PostService} from '../shared/services/post.service';
import {Config} from '../shared/config';
import {UserService} from '../shared/services/user.service';
import {injectTemplateRef} from '@angular/core/src/render3/view_engine_compatibility';

declare var require: any;

const Noty = require('noty');


declare let jQuery: any;


@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  trip_id: string;
  postsGrouped: any;
  trip = new Trip();
  post = new Post();
  selectedDay_id: number;
  time = '';
  am_pm = '';

  constructor(private route: ActivatedRoute,
              private tripService: TripService,
              private postService: PostService,
              private userService: UserService
  ) {
    this.route.params.subscribe(params => {
      this.trip_id = params.id;
    });
  }

  ngOnInit() {
    console.log(this.trip_id);
    this.getTripById(this.trip_id);
    const baseContext = this;

    this.initPost();
  }

  getTripById(id: string) {
    this.tripService.getTripById(id).subscribe(
      (data) => {
        this.trip = data;

      },
      (error) => {
      }
    );
  }

  initFileUploader() {
    Utils.initializeUploadFile(Config.baseUrl + '/uploadMultipleFiles', this.userService.getToken(), '.file-input-post', true, true, 6, false);
    let urls = [];

    jQuery('.file-input-post').on('filebatchuploadsuccess', (event, data) => {
      urls = [];
      data.response.forEach(item => {
        urls.push(item.fileDownloadUri);
      });
      this.post.imageUrls = urls;
    });

  }

  initPost() {
    this.post = new Post();
    this.am_pm = '';
    this.time = '';
    this.initFileUploader();
    this.initSelect();
  }

  initSelect() {
    jQuery('.selectpicker').selectpicker();

  }

  closeModal(modalId: string) {
    jQuery(modalId).modal('toggle');
  }


  arrayOne(n: number): any[] {
    return Array(n);
  }

  onOpenPostModalClick(item: any) {
    console.log('***opened modal******');
    this.post.day = item.dayNumber;
    this.selectedDay_id = item.id;
    console.log('selected DAY ', item.id);
  }

  onAddPostClick() {
    console.log(this.time + ' ' + this.am_pm);
    if (this.am_pm != '' && this.time != '') {
      this.post.time = this.time + ' ' + this.am_pm;
    }
    console.log(this.post.time);
    console.log(this.post);
    this.postService.addPost(this.post, this.selectedDay_id).subscribe(
      (data) => {
        console.log(data);
        console.log(this.trip.trip_days);
        console.log(this.selectedDay_id);
        console.log('DAYS', this.trip.trip_days.findIndex(item => item.id == this.selectedDay_id));
        const day_index = this.trip.trip_days.findIndex(item => item.id == this.selectedDay_id);
        this.trip.trip_days[day_index] = data;
        this.closeModal('#create-event');

        new Noty({
          theme: 'metroui',
          type: 'success',
          layout: 'topRight',
          timeout: 5000,
          progressBar: true,
          text: 'Your post is saved !'
        }).show();

        this.initPost();
      }
    );
  }

}
