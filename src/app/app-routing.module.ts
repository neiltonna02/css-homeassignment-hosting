import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { LoginComponent } from './login/login.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';
import { AppointmentAddGuardService } from './services/appointment-add-guard.service';
import { AppointmentUnauthorizedGuardService } from './services/appointment-unauthorized-guard.service';
import { AppointmentAuthorizedGuardService } from './services/appointment-authorized-guard.service';

//This class is the Routing Module. This is where the routes are defined.

const routes: Routes = [
  {path: 'appointments', component: AppointmentListComponent, canActivate: [AppointmentUnauthorizedGuardService]},
  {path: 'appointments/add', component: AppointmentAddComponent, canActivate: [AppointmentAddGuardService, AppointmentUnauthorizedGuardService]},
  {path: 'appointments/:id', component: AppointmentDetailComponent, canActivate: [AppointmentUnauthorizedGuardService]},
  {path: 'appointments/update/:id', component: AppointmentUpdateComponent, canActivate: [AppointmentUnauthorizedGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [AppointmentAuthorizedGuardService]},
  {path: '', redirectTo: '/appointments', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
