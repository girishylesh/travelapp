import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // importing HttpClient Injectable
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {

  
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    
  }

  getUser() {
    return this.httpClient.get(`${environment.apiEndpoint}/user/`+this.authService.getCurrentUser(), {
       headers: new HttpHeaders()
       .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
     });
  }
  
  updateUser(user) {
    return this.httpClient.put(`${environment.apiEndpoint}/user/`+this.authService.getCurrentUser(), user, {
       headers: new HttpHeaders()
       .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
     });
  }

  deleteUser() {
    return this.httpClient.delete(`${environment.apiEndpoint}/user/`+this.authService.getCurrentUser(), {
       headers: new HttpHeaders()
       .set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
     });
  }
}
