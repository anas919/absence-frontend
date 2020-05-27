import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LPAuthGuard } from 'laravel-passport';

import { SeanceListComponent } from './seances/seance-list/seance-list.component';
import { StudentListComponent } from './students/student-list/student-list.component';

import { SeanceAttendanceComponent } from './seances/seance-attendance/seance-attendance.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [LPAuthGuard], data: { loginRoute: 'login' }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full', canActivate: [LPAuthGuard], data: { loginRoute: 'login' } },
  { path: 'login', component: LoginComponent },
  { path: 'seances', component: SeanceListComponent, canActivate: [LPAuthGuard], data: { loginRoute: 'login' } },
  { path: 'seances/:seanceId', component: SeanceAttendanceComponent, canActivate: [LPAuthGuard], data: { loginRoute: 'login' } },
  { path: 'students', component: StudentListComponent, canActivate: [LPAuthGuard], data: { loginRoute: 'login' } },
  { path: 'students/:seanceId', component: SeanceAttendanceComponent, canActivate: [LPAuthGuard], data: { loginRoute: 'login' } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

SeanceAttendanceComponent