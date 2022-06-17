import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateRouteGuard} from './can-activate-route.guard';
import { UserComponent } from './user/user.component';
import { BookingComponent } from './booking/booking.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { TripsummaryComponent } from './tripsummary/tripsummary.component';
import { EmployeeviewComponent } from './employeeview/employeeview.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'booking/trip',
        component: BookingComponent
      },
      {
        path: 'booking/view',
        component: EmployeeviewComponent
      },
      {
        path: 'booking/summary',
        component: TripsummaryComponent
      },
      {
        path: 'vehicle/view',
        component: VehicleComponent
      }
    ]
  },
  {
    path: 'user',
    canActivate: [CanActivateRouteGuard],
    component: UserComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
