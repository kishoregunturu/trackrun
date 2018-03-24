import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component'
import { RunRouteComponent } from '../run-route/run-route.component'
import { CreateRouteComponent } from '../create-route/create-route.component'
import { ActivityComponent } from '../activity/activity.component'
import { LoginComponent } from '../login/login.component'

const appRoutes: Routes = [
  { path: 'run-route', component:RunRouteComponent },
  { path: 'login', component:LoginComponent },
  { path: 'create-route', component:CreateRouteComponent },
  { path: 'edit-route/:id', component:CreateRouteComponent },
  { path: 'home', component:RunRouteComponent },
  { path: '**', component: RunRouteComponent }
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