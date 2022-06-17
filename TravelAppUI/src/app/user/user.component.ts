import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService} from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  submitMessage: string;
  errorMessage: string;
  showSpinner: boolean;

  userForm: FormGroup = new FormGroup(
    {
      userId: new FormControl(),
      userPassword: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      userRole: new FormControl(),
      userAddedDate: new FormControl()
    }
  );

  constructor( private authService: AuthenticationService, 
    private routerService: RouterService, private userService: UserService) { }

    ngOnInit() {
      //this.userForm.patchValue({userId: 'test'});
      this.showSpinner=true;
      this.userService.getUser().subscribe(
        data => {
          this.userForm.patchValue(
          {
            userId: data['userId'],
            userPassword: data['userPassword'],
            firstName: data['firstName'],
            lastName: data['lastName'],
            userRole: data['userRole'],
            userAddedDate: data['userAddedDate']
          });
        },
        error => {
          this.errorMessage = "Could not connect to server.";
        }        
      ).add(() => {
        this.showSpinner=false;
      });
    }
  
  
    userSubmit() {   
      this.showSpinner=true;
      this.userService.updateUser(this.userForm.value).subscribe(
        data => {
          this.submitMessage="User details updated"
        },
        error => {
          if (error.status === 409) {
            this.errorMessage = "User already exist";
          }else if (error.status === 404) {
            this.errorMessage = "User not found";
          }else {
            this.errorMessage = "Could not connect to server";
          }
        }
      ).add(() => {
        this.showSpinner=false;
      });
    }

}
