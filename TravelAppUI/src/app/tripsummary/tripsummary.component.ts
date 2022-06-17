import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { Booking } from '../booking';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tripsummary',
  templateUrl: './tripsummary.component.html',
  styleUrls: ['./tripsummary.component.css']
})
export class TripsummaryComponent implements OnInit {

  dataSource = new MatTableDataSource();
  bookingArr: Array<Booking> = [];
  displayedColumns: string[] = ['bookingNumber','bookingDate', 'tripFrom', 'tripTo', 'tripDate', 'vehicleRegNo','tripCompletedDate'];
  errorMessage: string;
  currentDate: Date;
  
  constructor(private bookingService: BookingService) { 
    this.currentDate= new Date();
  }

  ngOnInit() {
    this.bookingService.getBookingByEmpTripCompleted(true).subscribe(
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

}
