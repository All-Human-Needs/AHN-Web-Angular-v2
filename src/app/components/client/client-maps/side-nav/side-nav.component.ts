import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutingModule } from './../../../../app-routing.module';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
currRoute;
  constructor(private route:Router) {
    this.route.events.subscribe((res => { 
     
      this.currRoute=this.route.url; 
  }).bind(this))
  // console.log(this.currRoute);
   }

  ngOnInit() {  
  }

}
