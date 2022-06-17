import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { RouterService } from './router.service';
describe('RouterService', () => {
  let service: RouterService;
  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const authenticationServiceStub = () => ({
      isUserLoggedIn: { next: () => ({}) }
    });
    TestBed.configureTestingModule({
      providers: [
        RouterService,
        { provide: Router, useFactory: routerStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        }
      ]
    });
    service = TestBed.get(RouterService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('routeToDashboard', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      service.routeToDashboard();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
  describe('routeToLogin', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      service.routeToLogin();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
  describe('routeToBookingView', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      service.routeToBookingView();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
  describe('routeToVehicleView', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      service.routeToVehicleView();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
