import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule, MatIconModule, MatInputModule, MatButtonModule, MatDialogModule, MatSidenavModule, MatListModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatExpansionModule, MatTableModule, MatDividerModule, MatProgressBarModule, MatTooltipModule, MatChipsModule, MatSnackBarModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AuthenticationService} from './services/authentication.service';
import { RouterService} from './services/router.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { UserComponent } from './user/user.component';
import { UserService } from './services/user.service';
import { BookingComponent } from './booking/booking.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { BookingService } from './services/booking.service';
import { VehicleService } from './services/vehicle.service';
import { EmployeeviewComponent } from './employeeview/employeeview.component';
import { TripsummaryComponent } from './tripsummary/tripsummary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
    BookingComponent,
    VehicleComponent,
    EmployeeviewComponent,
    TripsummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    MatDividerModule,
    MatTableModule,
    MatChipsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    RouterService,
    UserService,
    BookingService,
    VehicleService,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
