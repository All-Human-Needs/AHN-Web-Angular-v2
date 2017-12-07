import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }
  gotoMap(filter: string): void {
    const link = ['/main/client-maps', filter];
    this.router.navigate(link);
  }

}
