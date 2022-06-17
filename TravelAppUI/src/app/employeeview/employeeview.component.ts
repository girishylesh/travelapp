import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../booking';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employeeview',
  templateUrl: './employeeview.component.html',
  styleUrls: ['./employeeview.component.css']
})
export class EmployeeviewComponent implements OnInit {

  dataSource = new MatTableDataSource();
  bookingArr: Array<Booking> = [];
  displayedColumns: string[] = ['bookingNumber','bookingDate', 'tripFrom', 'tripTo', 'tripDate', 'vehicleRegNo','bookingConfirmed','cancelled'];
  errorMessage: string;
  
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.bookingService.getBookingByEmpId().subscribe(
      data => {
        this.bookingArr = data;
        this.dataSource.data=this.bookingArr;
      },
      error => {
        this.errorMessage = error.message;
        this.bookingArr = [];
        this.dataSource.data=this.bookingArr;
      }
    );
  }

  confirmBooking(bookingId: String){
    this.bookingService.confirmBooking(bookingId).subscribe(
      data => {
        this.bookingArr.find(item => item.bookingNumber == bookingId).bookingConfirmed = "true";
        this.dataSource.data=this.bookingArr;
      },
      error => {
          this.errorMessage = "Could not connect to server";
      }
    );
  }

  completeTrip(bookingId: String){
    this.bookingService.completeTrip(bookingId).subscribe(
      data => {
        //this.bookingArr.find(item => item.bookingNumber == bookingId).tripCompleted = "true";
        this.bookingArr=this.bookingArr.filter(obj=>obj.bookingNumber!=bookingId);
        this.dataSource.data=this.bookingArr;
      },
      error => {
          this.errorMessage = "Could not connect to server";
      }
    );
  }

}
