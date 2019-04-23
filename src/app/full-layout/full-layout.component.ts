import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {Client} from '../shared/models/client';


@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})


export class FullLayoutComponent implements OnInit {
  user: Client = new Client();

  constructor(private userService: UserService) {
  }

  ngOnInit() {



    this.userService.me().subscribe(
      (data) => {
        this.user = data;
        this.userService.storeUser(this.user);
      }
    );

  }


}
