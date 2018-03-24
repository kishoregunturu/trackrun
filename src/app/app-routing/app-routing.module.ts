import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component'
import { RunRouteComponent } from '../run-route/run-route.component'
import { CreateRouteComponent } from '../create-route/create-route.component'
import { ActivityComponent } from '../activity/activity.component'
import { LoginComponent } from '../login/login.component'
import {AuthService} from '../services/auth.service';

const appRoutes: Routes = [
  { path: 'run-route', component:RunRouteComponent, canLoad:[AuthService] },
  { path: 'login', component:LoginComponent },
  { path: 'create-route', component:CreateRouteComponent, canLoad:[AuthService] },
  { path: 'edit-route/:id', component:CreateRouteComponent, canLoad:[AuthService] },
  { path: 'home', component:RunRouteComponent, canLoad:[AuthService] },
  { path: '**', component: RunRouteComponent , canLoad:[AuthService]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only

      }
    )
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }