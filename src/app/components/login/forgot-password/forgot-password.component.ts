import { AuthenticationService } from '../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private auth:AuthenticationService) { }
  
ngOnInit() {
  }

  changePassword(email){this.auth.resetPassword(email);}
}
