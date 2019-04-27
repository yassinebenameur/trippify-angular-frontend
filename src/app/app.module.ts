import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FullLayoutComponent} from './full-layout/full-layout.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {FeedComponent} from './feed/feed.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {UserService} from './shared/services/user.service';
import {FileService} from './shared/services/file.service';
import {StorageService} from './shared/services/storage.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TripService} from './shared/services/trip.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PostComponent } from './post/post.component';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { TripListComponent } from './trip-list/trip-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    LoginComponent,
    FeedComponent,
    UserProfileComponent,
    NotFoundComponent,
    PostComponent,
    TripDetailsComponent,
    TripListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    UserService,
    StorageService,
    TripService,
    FileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
