import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';
import { UserComponent } from './user.component';
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  beforeEach(() => {
    const authenticationServiceStub = () => ({});
    const routerServiceStub = () => ({});
    const userServiceStub = () => ({
      getUser: () => ({ subscribe: () => ({ add: () => ({}) }) }),
      updateUser: value => ({ subscribe: () => ({ add: () => ({}) }) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserComponent],
      providers: [
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: RouterService, useFactory: routerServiceStub },
        { provide: UserService, useFactory: userServiceStub }
      ]
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'getUser').and.callThrough();
      component.ngOnInit();
      expect(userServiceStub.getUser).toHaveBeenCalled();
    });
  });
  describe('userSubmit', () => {
    it('makes expected calls', () => {
      const userServiceStub: UserService = fixture.debugElement.injector.get(
        UserService
      );
      spyOn(userServiceStub, 'updateUser').and.callThrough();
      component.userSubmit();
      expect(userServiceStub.updateUser).toHaveBeenCalled();
    });
  });
});
