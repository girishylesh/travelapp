import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RouterService {

  constructor(private router: Router,private authService: AuthenticationService) { }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToLogin() {
    this.authService.isUserLoggedIn.next(false);
    this.router.navigate(['login']);
  }

  routeToBookingView() {
    this.router.navigate(['dashboard/booking/trip']);
  }

  routeToVehicleView() {
    this.router.navigate(['dashboard/vehicle/view']);
  }
  


}
