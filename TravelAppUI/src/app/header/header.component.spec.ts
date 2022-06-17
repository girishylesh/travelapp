import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { HeaderComponent } from './header.component';
import { MatMenuModule } from '@angular/material';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(() => {
    const routerServiceStub = () => ({ routeToLogin: () => ({}) });
    const authenticationServiceStub = () => ({
      isUserLoggedIn: { subscribe: () => ({}) },
      isLoggedInUser: () => ({}),
      removeUserData: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HeaderComponent],
      imports: [MatMenuModule],
      providers: [
        { provide: RouterService, useFactory: routerServiceStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('isUserLoggedIn defaults to: false', () => {
    expect(component.isUserLoggedIn).toEqual(false);
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
