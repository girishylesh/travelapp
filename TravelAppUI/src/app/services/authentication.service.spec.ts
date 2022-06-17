import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { User } from '../user';
describe('AuthenticationService', () => {
  let service: AuthenticationService;
  beforeEach(() => {
    const userStub = () => ({ userId: {} });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService,
        { provide: User, useFactory: userStub }]
    });
    service = TestBed.get(AuthenticationService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('deleteUser', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const userStub: User = TestBed.get(User);
      spyOn(service, 'getCurrentUser').and.callThrough();
      service.deleteUser().subscribe(res => {
        expect(res).toEqual(userStub);
      });
      expect(service.getCurrentUser).toHaveBeenCalled();
      const req = httpTestingController.expectOne(`http://localhost:8090/api/v1/user/auth/user/`+service.getCurrentUser());
      expect(req.request.method).toEqual('DELETE');
      req.flush(userStub);
      httpTestingController.verify();
    });
  });
  describe('isLoggedInUser', () => {
    it('makes expected calls', () => {
      spyOn(service, 'getBearerToken').and.callThrough();
      spyOn(service, 'removeUserData').and.callThrough();
      service.isLoggedInUser();
      expect(service.getBearerToken).toHaveBeenCalled();
    });
  });
});
