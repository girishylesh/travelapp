import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { Booking } from '../booking';
import { BookingService } from './booking.service';
describe('BookingService', () => {
  let service: BookingService;
  beforeEach(() => {
    const authenticationServiceStub = () => ({
      getCurrentUser: () => ({}),
      getBearerToken: () => ({})
    });
    const bookingStub = () => ({ userId: {}, employeeId: {} });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BookingService,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: Booking, useFactory: bookingStub }
      ]
    });
    service = TestBed.get(BookingService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('getBookingByUserId', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const bookingArrStub: Array<Booking> = TestBed.get(Booking);
      const authenticationServiceStub: AuthenticationService = TestBed.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'getCurrentUser').and.callThrough();
      spyOn(authenticationServiceStub, 'getBearerToken').and.callThrough();
      service.getBookingByUserId().subscribe(res => {
        expect(res).toEqual(bookingArrStub);
      });
      const req = httpTestingController.expectOne(`http://localhost:8090/api/v1/booking/user/`+authenticationServiceStub.getCurrentUser());
      expect(req.request.method).toEqual('GET');
      expect(authenticationServiceStub.getCurrentUser).toHaveBeenCalled();
      expect(authenticationServiceStub.getBearerToken).toHaveBeenCalled();
      req.flush(bookingArrStub);
      httpTestingController.verify();
    });
  });
  describe('getBookingByEmpId', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const bookingArrStub: Array<Booking> = TestBed.get(Booking);
      const authenticationServiceStub: AuthenticationService = TestBed.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'getCurrentUser').and.callThrough();
      spyOn(authenticationServiceStub, 'getBearerToken').and.callThrough();
      service.getBookingByEmpId().subscribe(res => {
        expect(res).toEqual(bookingArrStub);
      });
      const req = httpTestingController.expectOne(`http://localhost:8090/api/v1/booking/emp/`+authenticationServiceStub.getCurrentUser());
      expect(req.request.method).toEqual('GET');
      expect(authenticationServiceStub.getCurrentUser).toHaveBeenCalled();
      expect(authenticationServiceStub.getBearerToken).toHaveBeenCalled();
      req.flush(bookingArrStub);
      httpTestingController.verify();
    });
  });
});
