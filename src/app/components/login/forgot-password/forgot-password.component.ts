import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
form: any;
  constructor(private auth: AuthenticationService, fb: FormBuilder) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email(){
    return this.form.get('email');
  }
ngOnInit() {
  }

  changePassword(email){this.auth.resetPassword(email); }
}
