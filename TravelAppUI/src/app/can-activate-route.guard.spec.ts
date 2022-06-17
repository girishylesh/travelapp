import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
describe('CanActivateRouteGuard', () => {
  let service: CanActivateRouteGuard;
  beforeEach(() => {
    const activatedRouteSnapshotStub = () => ({});
    const routerStateSnapshotStub = () => ({});
    const authenticationServiceStub = () => ({
      isUserAuthenticated: arg => ({ then: () => ({}) }),
      getBearerToken: () => ({})
    });
    const routerServiceStub = () => ({ routeToLogin: () => ({}) });
    TestBed.configureTestingModule({
      providers: [
        CanActivateRouteGuard,
        {
          provide: ActivatedRouteSnapshot,
          useFactory: activatedRouteSnapshotStub
        },
        { provide: RouterStateSnapshot, useFactory: routerStateSnapshotStub },
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: RouterService, useFactory: routerServiceStub }
      ]
    });
    service = TestBed.get(CanActivateRouteGuard);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('canActivate', () => {
    it('makes expected calls', () => {
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = TestBed.get(
        ActivatedRouteSnapshot
      );
      const routerStateSnapshotStub: RouterStateSnapshot = TestBed.get(
        RouterStateSnapshot
      );
      const authenticationServiceStub: AuthenticationService = TestBed.get(
        AuthenticationService
      );
      const routerServiceStub: RouterService = TestBed.get(RouterService);
      spyOn(authenticationServiceStub, 'isUserAuthenticated').and.callThrough();
      spyOn(authenticationServiceStub, 'getBearerToken').and.callThrough();
      spyOn(routerServiceStub, 'routeToLogin').and.callThrough();
      service.canActivate(activatedRouteSnapshotStub, routerStateSnapshotStub);
      expect(authenticationServiceStub.isUserAuthenticated).toHaveBeenCalled();
      expect(authenticationServiceStub.getBearerToken).toHaveBeenCalled();
    });
  });
});
