import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { VehicleService } from '../services/vehicle.service';

import { Booking } from '../booking';
import { Vehicle } from '../vehicle';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  booking: Booking;
  dataSource = new MatTableDataSource();
  bookingArr: Array<Booking> = [];
  vehicles: Array<Vehicle> = [];
  displayedColumns: string[] = ['bookingNumber','bookingDate', 'tripFrom', 'tripTo', 'tripDate', 'vehicleRegNo','bookingConfirmed','cancelled'];
  errorMessage: string;

  bookingForm: FormGroup = new FormGroup(
    {
      bookingNumber: new FormControl(),
      bookingDate: new FormControl(),
      tripDate: new FormControl(),
      tripFrom: new FormControl(),
      tripTo: new FormControl(),
      userId: new FormControl(),
      vehicleRegNo: new FormControl(),
      employeeId: new FormControl(),
      cancelled: new FormControl(),
      bookingConfirmed: new FormControl(),
      tripCompleted: new FormControl(),
      tripCompletedDate: new FormControl()
    }
  );
  
  constructor(private bookingService: BookingService, private vehicleService: VehicleService, private _snackBar: MatSnackBar) { 
  }

  ngOnInit() {

    this.vehicleService.getAvailVehicles().subscribe(
      data => {
        this.vehicles = data;
      },
      error => {
        this.errorMessage = error.message;
        this.vehicles = [];
      }
    );

    this.bookingService.getBookingByUserId().subscribe(
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

  bookingSubmit(){
    let empId= this.vehicles.find(item => item.vehicleRegNo == this.bookingForm.get('vehicleRegNo').value).vehicleEmpId;
    this.bookingService.bookTrip(this.bookingForm.value,empId).subscribe(
      data => {
        this.bookingArr.push(data);
        this.dataSource.data=this.bookingArr;
        this.bookingForm.reset();
        Object.keys(this.bookingForm.controls).forEach(key => {
          this.bookingForm.controls[key].setErrors(null)
        });
        this.openSnackBar("Trip Booked","Close");
      },
      error => {
        if (error.status === 409) {
          this.errorMessage = "Booking already exist";
        }
        else {
          this.errorMessage = "Could not connect to server";
        }
      }
    );
  }

  cancelBooking(bookingId: String){
    this.bookingService.cancelBooking(bookingId).subscribe(
      data => {
        this.bookingArr.find(item => item.bookingNumber == bookingId).cancelled = "true";
        this.dataSource.data=this.bookingArr;
      },
      error => {
          this.errorMessage = "Could not connect to server";
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
  
}
