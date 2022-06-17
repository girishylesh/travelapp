import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isUserLoggedIn: Boolean = true;

  constructor(private routerService: RouterService, 
      private breakpointObserver: BreakpointObserver,
      private authService: AuthenticationService) {
    
        this.routerService.routeToBookingView();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  ngOnInit() {
    this.isUserLoggedIn= this.authService.isLoggedInUser();
  }

  logout() {
    this.authService.removeUserData();
    this.routerService.routeToLogin();
  }

}
