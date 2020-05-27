import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatTableModule, MatDialogModule, MatSelectModule, MatRadioModule, MatSlideToggleModule, MatGridListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { LaravelPassportModule } from 'laravel-passport';
import { LoginComponent } from './auth/login/login.component';
import { NotificationsComponent } from './helpers/notifications/notifications.component';
import { SearchFilterPageModule } from './helpers/search-filter/search-filter.module';
import { SeanceListComponent } from './seances/seance-list/seance-list.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { SeanceCreateComponent } from './seances/seance-create/seance-create.component';
import { SeanceAttendanceComponent } from './seances/seance-attendance/seance-attendance.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, NotificationsComponent, SeanceListComponent, SeanceCreateComponent, SeanceAttendanceComponent, StudentListComponent],
  entryComponents: [NotificationsComponent, SeanceCreateComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LaravelPassportModule.forRoot({
      apiRoot: 'http://localhost:8000',
      clientId: 3,
      clientSecret: 'vgbWjqHf01L5OLral46e5HBgKPLreWVI83uAxcqm'
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatGridListModule,
    SearchFilterPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
