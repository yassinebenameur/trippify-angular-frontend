import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trippify2';

  constructor() {
  }

  loginFacebook() {
  //  this.router.navigate(['http://localhost:8080/oauth2/authorize/facebook?redirect_uri=http://localhost:4200']);

  }
}
