import { Business } from '../../models/business/business.class';
import { BusinessService } from '../../services/business.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private _businessService:BusinessService) { }
  isBusiness:boolean = false;
  form = new FormGroup({
    userForm: new FormGroup({ 
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      confirmPwrd:new FormControl('',[Validators.required,Validators.pattern('1234')]),
    }),
    businessForm: new FormGroup({
      lat: new FormControl('',[Validators.required]),
      lng: new FormControl('',[Validators.required])
    }),
    
  });

  get email(){
    return this.form.get('userForm.email');
  }

  get password(){
    return this.form.get('userForm.password');
  }

  get confirmPwrd(){
    return this.form.get('userForm.confirmPwrd');
  }

  get lat(){
    return this.form.get('businessForm.lat');
  }

  get lng(){
    return this.form.get('businessForm.lng');
  }

  ngOnInit() {
  }

  toggleUser(){
    this.isBusiness= !this.isBusiness;
  }

  register(){
    let business:Business = {
      id:"string",
      //key:string;
      name:"string",
      lat:0,
      lng:0,
      category:"string",
      capacity:150,
      isActive:true,
      stats: [],
    }
    this._businessService.addBusiness(business);
  }

  validForm(){
    if(this.isBusiness){
      return !this.form.valid;
    }else{
      return !this.form.get("userForm").valid;
    }
  }

}
