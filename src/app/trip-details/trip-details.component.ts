import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Trip} from '../shared/models/trip';
import {TripService} from '../shared/services/trip.service';
import {Utils} from '../shared/utils';
import {Post} from '../shared/models/post';
import {PostService} from '../shared/services/post.service';

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

  constructor(private route: ActivatedRoute,
              private tripService: TripService,
              private postService: PostService
  ) {
    this.route.params.subscribe(params => {
      this.trip_id = params.id;
    });
  }

  ngOnInit() {
    console.log(this.trip_id);
    this.getTripById(this.trip_id);
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

  arrayOne(n: number): any[] {
    return Array(n);
  }

  onOpenPostModalClick(item: any) {
    this.post.day = item.dayNumber;
    this.selectedDay_id = item.id;
    console.log(item);
  }

  onAddPostClick() {
    console.log(this.post);
    this.postService.addPost(this.post, this.selectedDay_id).subscribe(
      (data) => {
        new Noty({
          theme: 'metroui',
          type: 'success',
          layout: 'topRight',
          timeout: 5000,
          progressBar: true,
          text: 'Your post is saved !'
        }).show();
      }
    );
  }

}
