import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // importing HttpClient Injectable
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Booking } from '../booking';
import 'rxjs/add/operator/do';

@Injectable()
export class BookingService {

    constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
        
    }

    getBookingByUserId() {
        return this.httpClient.get<Array<Booking>>(`${environment.apiEndpoint}/booking/user/${this.authService.getCurrentUser()}`, {
           headers: new HttpHeaders()
           .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
         });
    }

    getBookingByEmpId() {
      return this.httpClient.get<Array<Booking>>(`${environment.apiEndpoint}/booking/emp/${this.authService.getCurrentUser()}`, {
         headers: new HttpHeaders()
         .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
       });
    }

    getBookingByEmpTripCompleted(tripCompleted: boolean) {
      return this.httpClient.get<Array<Booking>>(`${environment.apiEndpoint}/booking/emp/${this.authService.getCurrentUser()}/tripcompleted/${tripCompleted}`, {
         headers: new HttpHeaders()
         .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
       });
    }

    bookTrip(booking: Booking, empId:String) {
        booking.userId= this.authService.getCurrentUser();
        booking.employeeId= empId;
        return this.httpClient.post<Booking>(`${environment.apiEndpoint}/booking/create`, booking, {
           headers: new HttpHeaders()
           .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
         });
    }

    cancelBooking(bookingid: String)
    {
      return this.httpClient.put(`${environment.apiEndpoint}/booking/cancel/${bookingid}`,null, {
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      });
    }

    confirmBooking(bookingid: String)
    {
      return this.httpClient.put(`${environment.apiEndpoint}/booking/confirm/${bookingid}`,null, {
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      });
    }

    completeTrip(bookingid: String)
    {
      return this.httpClient.put(`${environment.apiEndpoint}/booking/completeTrip/${bookingid}`,null, {
        headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
      });
    }
}