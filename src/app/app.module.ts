import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RunRouteComponent } from './run-route/run-route.component';
import { ActivityComponent } from './activity/activity.component';
import { CreateRouteComponent } from './create-route/create-route.component';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './services/map.service';
import { FirebaseService } from './services/firebase.service';
import { LoginComponent } from './login/login.component';
import {AuthService} from './services/auth.service';  

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    RunRouteComponent,
    ActivityComponent,
    CreateRouteComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDtQGPB1JkcBOWbD0xMO_yoJkEeDAJ169o'
    })
  ],
  providers: [MapService,FirebaseService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
