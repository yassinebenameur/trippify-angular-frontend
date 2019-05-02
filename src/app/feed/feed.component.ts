import {Component, OnInit} from '@angular/core';
import {TripService} from '../shared/services/trip.service';
import {Trip} from '../shared/models/trip';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  trips: Trip[];
  page: number;

  constructor(private tripService: TripService) {
  }

  ngOnInit() {
    this.page = 0;
    this.getTripsFeed(this.page);
  }

  getTripsFeed(page: number) {
    this.tripService.getTripsFeed(page).subscribe(
      (data) => {
        this.trips = data.content;
      }
    );

  }

  loadMore() {
    this.page++;
    this.tripService.getTripsFeed(this.page).subscribe(
      (data) => {
        this.trips = this.trips.concat(data.content);
      }
    );
  }

}
