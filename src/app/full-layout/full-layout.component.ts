import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {Client} from '../shared/models/client';
import {StorageService} from '../shared/services/storage.service';
import {Router} from '@angular/router';

declare let jQuery: any;

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})


export class FullLayoutComponent implements OnInit {
  user: Client = new Client();
  users: Client[] = [];

  constructor(private storageService: StorageService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getConnectedUserDetails();
    this.getAllUsers();

  }

  logout() {
    this.storageService.removeAll();
    this.router.navigateByUrl('/login');
  }


  getConnectedUserDetails() {
    this.userService.me().subscribe(
      (data) => {
        this.user = data;
        this.userService.storeUser(this.user);
      }
    );
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.initSearch();
      }
    );
  }

  initSearch() {

    var topUserSearch = jQuery('.js-user-search2');

    if (topUserSearch.length) {
      topUserSearch.selectize({
        persist: true,
        maxItems: 1,
        valueField: 'name',
        labelField: 'name',
        searchField: ['name'],
        options: this.users,
        render: {
          option: function (item, escape) {
            return '<div class="inline-items">' +
              (item.imageUrl ? '<div class="author-thumb"><img src="' + escape(item.imageUrl) + '" alt="avatar" style="width: 50px"></div>' : '') +
              '<div class="notification-event">' +
              (item.name ? '<span class="h6 notification-friend"></a>' + escape(item.name) + '</span>' : '') +
              (item.email ? '<span class="chat-message-item">' + escape(item.email) + '</span>' : '') +
              '</div>';
          },
          item: function (item, escape) {
            var label = item.name;
            return '<div>' +
              '<span class="label">' + escape(label) + '</span>' +
              '</div>';
          }
        }
      });
    }
  }


}

