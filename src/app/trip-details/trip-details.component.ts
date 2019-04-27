import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Trip} from '../shared/models/trip';
import {TripService} from '../shared/services/trip.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  trip_id: string;
  trip = new Trip();

  constructor(private route: ActivatedRoute,
              private tripService: TripService
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

}
