import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // importing HttpClient Injectable
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Vehicle } from '../vehicle';
import 'rxjs/add/operator/do';

@Injectable()
export class VehicleService {

    constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    }

    getAllVehicles() {
        return this.httpClient.get<Array<Vehicle>>(`${environment.apiEndpoint}/booking/vehicle/all`, {
           headers: new HttpHeaders()
           .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
         });
    }

    

    getAvailVehicles() {
        return this.httpClient.get<Array<Vehicle>>(`${environment.apiEndpoint}/booking/vehicle/avail`, {
           headers: new HttpHeaders()
           .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
         });
    }

    addVehicle(vehicle: Vehicle) {
        vehicle.vehicleEmpId=this.authService.getCurrentUser();
        return this.httpClient.post<Vehicle>(`${environment.apiEndpoint}/booking/vehicle`, vehicle, {
           headers: new HttpHeaders()
           .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
         });
    }
}