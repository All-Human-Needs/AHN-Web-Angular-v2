import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filterargs = {displayFiltered: 'location'};
  emergencyBuildings = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  restaurants = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  governmentBuildings = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  shops = [{title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];
  library = [{ title: '/'}, {title: '/'}, {title: '/'}, {title: '/'}];

  constructor() { }

  ngOnInit() {
  }
displayFiltered ( userpref: String) {
   if (userpref === 'Emergency Buildings') {
  console.log(this.emergencyBuildings);
 } else {if (userpref === 'Restaurants') {
   console.log(this.restaurants);
 } else {if (userpref === 'Government Buildings') {
   console.log(this.governmentBuildings);
 } else {if (userpref === 'Shops') {
  console.log(this.shops);
 } else {if (userpref === 'Library') {
  console.log(this.library);
 }}
 } } } }}


