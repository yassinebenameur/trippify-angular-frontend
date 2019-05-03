import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FullLayoutComponent} from './full-layout/full-layout.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {FeedComponent} from './feed/feed.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {PostComponent} from './post/post.component';
import {TripDetailsComponent} from './trip-details/trip-details.component';
import {CanActivateViaAuthGuard} from './shared/services/auth-guard.service';


export const routes: Routes = [
  { canActivate: [CanActivateViaAuthGuard],
    path: '',
    component: FullLayoutComponent,

    children: [
      {
        path: '',
        component: FeedComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
      {
        path: 'trip-details/:id',
        component: TripDetailsComponent
      }
      ],
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
