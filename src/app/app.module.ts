import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentService } from './services/appointment.service';
import { HeaderComponent } from './header/header.component';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UserAccountService } from './services/useraccount.service';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';
import { AppointmentAddGuardService } from './services/appointment-add-guard.service';
import { AppointmentUnauthorizedGuardService } from './services/appointment-unauthorized-guard.service';
import { AppointmentAuthorizedGuardService } from './services/appointment-authorized-guard.service';
import { ExcelService } from './services/excel.service';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentListComponent,
    HeaderComponent,
    AppointmentAddComponent,
    LoginComponent,
    AppointmentDetailComponent,
    AppointmentUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AppointmentService,
    UserAccountService,
    AppointmentAddGuardService,
    AppointmentUnauthorizedGuardService,
    AppointmentAuthorizedGuardService,
    ExcelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
