import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { Vehicle } from '../vehicle';
import { VehicleService } from './vehicle.service';
describe('VehicleService', () => {
  let service: VehicleService;
  beforeEach(() => {
    const authenticationServiceStub = () => ({
      getBearerToken: () => ({}),
      getCurrentUser: () => ({})
    });
    const vehicleStub = () => ({ vehicleEmpId: {} });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VehicleService,
        {
          provide: AuthenticationService,
          useFactory: authenticationServiceStub
        },
        { provide: Vehicle, useFactory: vehicleStub }
      ]
    });
    service = TestBed.get(VehicleService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('addVehicle', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const authenticationServiceStub: AuthenticationService = TestBed.get(
        AuthenticationService
      );
      const vehicleStub: Vehicle = TestBed.get(Vehicle);
      spyOn(authenticationServiceStub, 'getCurrentUser').and.callThrough();
      spyOn(authenticationServiceStub, 'getBearerToken').and.callThrough();
      service.addVehicle(vehicleStub).subscribe(res => {
        expect(res).toEqual(vehicleStub);
      });
      const req = httpTestingController.expectOne('http://localhost:8090/api/v1/booking/vehicle');
      expect(req.request.method).toEqual('POST');
      expect(authenticationServiceStub.getCurrentUser).toHaveBeenCalled();
      expect(authenticationServiceStub.getBearerToken).toHaveBeenCalled();
      req.flush(vehicleStub);
      httpTestingController.verify();
    });
  });
  describe('getAllVehicles', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const vehicleArrStub: Array<Vehicle> = TestBed.get(Vehicle);
      const authenticationServiceStub: AuthenticationService = TestBed.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'getBearerToken').and.callThrough();
      service.getAllVehicles().subscribe(res => {
        expect(res).toEqual(vehicleArrStub);
      });
      const req = httpTestingController.expectOne('http://localhost:8090/api/v1/booking/vehicle/all');
      expect(req.request.method).toEqual('GET');
      expect(authenticationServiceStub.getBearerToken).toHaveBeenCalled();
      req.flush(vehicleArrStub);
      httpTestingController.verify();
    });
  });
  describe('getAvailVehicles', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.get(HttpTestingController);
      const vehicleArrStub: Array<Vehicle> = TestBed.get(Vehicle);
      const authenticationServiceStub: AuthenticationService = TestBed.get(
        AuthenticationService
      );
      spyOn(authenticationServiceStub, 'getBearerToken').and.callThrough();
      service.getAvailVehicles().subscribe(res => {
        expect(res).toEqual(vehicleArrStub);
      });
      const req = httpTestingController.expectOne('http://localhost:8090/api/v1/booking/vehicle/avail');
      expect(req.request.method).toEqual('GET');
      expect(authenticationServiceStub.getBearerToken).toHaveBeenCalled();
      req.flush(vehicleArrStub);
      httpTestingController.verify();
    });
  });
});
