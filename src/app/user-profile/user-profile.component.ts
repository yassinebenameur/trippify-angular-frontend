import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StorageService} from '../shared/services/storage.service';
import {UserService} from '../shared/services/user.service';
import {Client} from '../shared/models/client';
import {Trip} from '../shared/models/trip';
import {TripService} from '../shared/services/trip.service';
import {FileService} from '../shared/services/file.service';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private user: Client;
  trips: Trip[];
  newTrip: Trip = new Trip();


  constructor(private userService: UserService
  ) {
  }

  ngOnInit() {
    this.user = this.userService.readUser();
    console.log(this.user);

  }
}
