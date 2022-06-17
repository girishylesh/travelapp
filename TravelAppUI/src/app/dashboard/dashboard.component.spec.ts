import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { DashboardComponent } from './dashboard.component';
import { MatMenuModule } from '@angular/material';
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  beforeEach(() => {
    const routerServiceStub = () => ({
      routeToBookingView: () => ({}),
      routeToLogin: () => ({})
    });
    const authenticationServiceStub = () => ({
      isLoggedInUser: () => ({}),
      removeUserData: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DashboardComponent],
      imports: [MatMenuModule],
      providers: [
        { provide: RouterService, useFactory: routerServiceStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('isUserLoggedIn defaults to: true', () => {
    expect(component.isUserLoggedIn).toEqual(true);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'isLoggedInUser').and.callThrough();
      component.ngOnInit();
      expect(authenticationServiceStub.isLoggedInUser).toHaveBeenCalled();
    });
  });
  describe('logout', () => {
    it('makes expected calls', () => {
      const routerServiceStub: RouterService = fixture.debugElement.injector.get(
        RouterService
      );
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      spyOn(routerServiceStub, 'routeToLogin').and.callThrough();
      spyOn(authenticationServiceStub, 'removeUserData').and.callThrough();
      component.logout();
      expect(routerServiceStub.routeToLogin).toHaveBeenCalled();
      expect(authenticationServiceStub.removeUserData).toHaveBeenCalled();
    });
  });
});
