import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';
import { User } from '../user';
describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    const authenticationServiceStub = () => ({
      getCurrentUser: () => ({}),
      getBearerToken: () => ({})
    });
    const userStub = () => ({ userId: {} });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: User, useFactory: userStub }
      ]
    });
    service = TestBed.get(UserService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('getUser', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const userStub: User = TestBed.get(User);
      const authenticationServiceStub: AuthenticationService = TestBed.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'getCurrentUser').and.callThrough();
      spyOn(authenticationServiceStub, 'getBearerToken').and.callThrough();
      service.getUser().subscribe(res => {
        expect(res).toEqual(userStub);
      });
      const req = httpTestingController.expectOne(`http://localhost:8090/api/v1/user/`+authenticationServiceStub.getCurrentUser());
      expect(req.request.method).toEqual('GET');
      expect(authenticationServiceStub.getCurrentUser).toHaveBeenCalled();
      expect(authenticationServiceStub.getBearerToken).toHaveBeenCalled();
      req.flush(userStub);
      httpTestingController.verify();
    });
  });
  describe('deleteUser', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const userStub: User = TestBed.get(User);
      const authenticationServiceStub: AuthenticationService = TestBed.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'getCurrentUser').and.callThrough();
      spyOn(authenticationServiceStub, 'getBearerToken').and.callThrough();
      service.deleteUser().subscribe(res => {
        expect(res).toEqual(userStub);
      });
      const req = httpTestingController.expectOne(`http://localhost:8090/api/v1/user/`+authenticationServiceStub.getCurrentUser());
      expect(req.request.method).toEqual('DELETE');
      expect(authenticationServiceStub.getCurrentUser).toHaveBeenCalled();
      expect(authenticationServiceStub.getBearerToken).toHaveBeenCalled();
      req.flush(userStub);
      httpTestingController.verify();
    });
  });
});
