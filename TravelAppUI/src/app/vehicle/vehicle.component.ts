import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../vehicle';
import { VehicleService } from '../services/vehicle.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicle: Vehicle;
  dataSource = new MatTableDataSource();

  vehiclesArr: Array<Vehicle> = [];
  errorMessage: string;
  submitMessage: string;
  displayedColumns: string[] = ['vehicleRegNo','vehicleName'];

  vehicleForm: FormGroup = new FormGroup(
    {
      vehicleRegNo: new FormControl(),
      vehicleName: new FormControl(),
      vehicleEmpId: new FormControl(),
      vehicleAddedDate: new FormControl(),
      booked: new FormControl()
    }
  );
  constructor(private vehicleService: VehicleService,  private _snackBar: MatSnackBar) { 
  }

  ngOnInit() {
    this.vehicleService.getAllVehicles().subscribe(
      data => {
        this.vehiclesArr = data;
        this.dataSource.data=this.vehiclesArr;
      },
      error => {
        this.errorMessage = error.message;
        this.vehiclesArr = [];
        this.dataSource.data=this.vehiclesArr;
      }
    );
  }

  vehicleSubmit(){
    this.vehicleService.addVehicle(this.vehicleForm.value).subscribe(
      data => {
        this.vehiclesArr.push(data);
        this.dataSource.data=this.vehiclesArr;
        this.vehicleForm.reset();
        Object.keys(this.vehicleForm.controls).forEach(key => {
          this.vehicleForm.controls[key].setErrors(null)
        });
        this.openSnackBar("Vehicle added.","Close");
      },
      error => {
        if (error.status === 409) {
          this.errorMessage = "Vehicle already exist";
        }
        else {
          this.errorMessage = "Could not connect to server";
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

}
