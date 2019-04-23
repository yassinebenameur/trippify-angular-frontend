import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
    this.route.queryParams.subscribe(params => {
      const token = params.token;
      if (token) {
        this.userService.storeUserAccessToken(token);
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
  }

}
