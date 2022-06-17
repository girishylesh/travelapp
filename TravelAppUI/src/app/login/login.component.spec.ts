import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { MatSnackBar } from '@angular/material';
import { LoginComponent } from './login.component';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(() => {
    const authenticationServiceStub = () => ({
      isLoggedInUser: () => ({}),
      authenticateUser: value => ({ subscribe: () => ({ add: () => ({}) }) }),
      setBearerToken: arg => ({}),
      setCurrentUser: arg => ({}),
      isUserLoggedIn: { next: () => ({}) },
      registerUser: value => ({ subscribe: () => ({ add: () => ({}) }) })
    });
    const routerServiceStub = () => ({
      routeToDashboard: () => ({}),
      routeToBookingView: () => ({})
    });
    const matSnackBarStub = () => ({ open: (message, action, object) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: RouterService, useFactory: routerServiceStub },
        { provide: MatSnackBar, useFactory: matSnackBarStub }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('toggleDiv defaults to: true', () => {
    expect(component.toggleDiv).toEqual(true);
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      const routerServiceStub: RouterService = fixture.debugElement.injector.get(
        RouterService
      );
      spyOn(authenticationServiceStub, 'isLoggedInUser').and.callThrough();
      spyOn(routerServiceStub, 'routeToDashboard').and.callThrough();
      component.ngOnInit();
      expect(authenticationServiceStub.isLoggedInUser).toHaveBeenCalled();
      expect(routerServiceStub.routeToDashboard).toHaveBeenCalled();
    });
  });
  describe('loginSubmit', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      const routerServiceStub: RouterService = fixture.debugElement.injector.get(
        RouterService
      );
      spyOn(authenticationServiceStub, 'authenticateUser').and.callThrough();
      spyOn(authenticationServiceStub, 'setBearerToken').and.callThrough();
      spyOn(authenticationServiceStub, 'setCurrentUser').and.callThrough();
      spyOn(routerServiceStub, 'routeToBookingView').and.callThrough();
      component.loginSubmit();
      expect(authenticationServiceStub.authenticateUser).toHaveBeenCalled();
    });
  });
  describe('registerSubmit', () => {
    it('makes expected calls', () => {
      const authenticationServiceStub: AuthenticationService = fixture.debugElement.injector.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'registerUser').and.callThrough();
      component.registerSubmit();
      expect(authenticationServiceStub.registerUser).toHaveBeenCalled();
    });
  });
});
