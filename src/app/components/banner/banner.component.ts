import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'ahn-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  title: 'All Human Needs';
  constructor(private authService: AuthenticationService) {}
  logout() {
  this.authService.logout();
  }
  ngOnInit() {
  }

}
