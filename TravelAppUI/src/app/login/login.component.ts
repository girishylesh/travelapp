import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService} from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  toggleDiv: Boolean = true;
  submitMessage: string;
  errorMessage: string;
  showSpinner: boolean;
  private userId: string;
  private userPassword: string;
  private firstName: string;
  private lastName: string;
  private userRole="USER";

  constructor( private authService: AuthenticationService, private routerService: RouterService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if(this.authService.isLoggedInUser()) this.routerService.routeToDashboard()
  }

  loginForm: FormGroup = new FormGroup(
    {
      userId: new FormControl(),
      userPassword: new FormControl()
    }
  );

  registerForm: FormGroup = new FormGroup(
    {
      userId: new FormControl(),
      userPassword: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      userRole: new FormControl()
    }
  );
  showHideContent()
  {
    this.errorMessage ="";
    this.submitMessage ="";
    this.toggleDiv=this.toggleDiv?false:true;
  }


  loginSubmit() {
    this.showSpinner=true;
    this.authService.authenticateUser(this.loginForm.value).subscribe(
      data => {
        this.authService.setBearerToken(data['token']);
        this.authService.setCurrentUser(data['currentUser']);
        this.authService.isUserLoggedIn.next(true);
        this.routerService.routeToBookingView();       
      },
      error => {
        if (error.status === 401) {
          this.errorMessage = "Invalid credentials";
        }else {
          this.errorMessage = error.message;
        }
        this.loginForm.reset();
        Object.keys(this.loginForm.controls).forEach(key => {
          this.loginForm.controls[key].setErrors(null)
        });
        this.openSnackBar(this.errorMessage,"Close");
      }
    ).add(() => {
      this.showSpinner=false;
    });
  }

  registerSubmit() {
    this.showSpinner=true;
    this.authService.registerUser(this.registerForm.value).subscribe(
      data => {
        this.submitMessage = "Registered succesfully. Login to continue.";
        this.registerForm.reset();
        this.toggleDiv=true;
        this.openSnackBar(this.submitMessage,"Close");
      },
      error => {
        if (error.status === 409) {
          this.errorMessage = "User already exist.";
        }else {
          this.errorMessage = "Could not connect to server.";
        }
        this.openSnackBar(this.errorMessage,"Close");
      }
    ).add(() => {
      this.showSpinner=false;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
