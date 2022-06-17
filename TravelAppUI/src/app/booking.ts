export class Booking {
    bookingNumber: String;
    bookingDate: String;
    tripDate: Date;
    tripFrom: String;
    tripTo: String;
    userId: String;
    vehicleRegNo: String;
    employeeId: String;
    cancelled: String;
    bookingConfirmed: String;
    tripCompleted: String;
    tripCompletedDate: String;

    constructor() {
        this.bookingNumber='';
        this.bookingDate='';
        this.tripDate= null;
        this.tripFrom='';
        this.tripTo='';
        this.userId='';
        this.vehicleRegNo='';
        this.employeeId='';
        this.cancelled='';
        this.bookingConfirmed='';
        this.tripCompleted='';
        this.tripCompletedDate='';
    }
}