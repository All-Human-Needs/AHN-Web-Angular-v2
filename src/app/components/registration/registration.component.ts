import { Stats } from '../../models/business/stats.class';
import { AuthenticationService } from '../../services/authentication.service';
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

  constructor(private _businessService:BusinessService,private _authenticationService:AuthenticationService) { }


  isBusiness:boolean = false;
  //id:string;
  //key:string;
  businessName:string;
  lati:number;
  long:number;
  category:string ="bank";
  capacity:number =10;
  //isActive:true;
  //stats: Stats[];


  form = new FormGroup({
    userForm: new FormGroup({ 
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
      confirmPwrd:new FormControl('',[Validators.required,Validators.pattern('1234')]),
    }),
    businessForm: new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      lat: new FormControl('',[Validators.required,Validators.pattern("^[0-9]+$")]),
      lng: new FormControl('',[Validators.required,Validators.pattern("^[0-9]+$")]),
      capacity:new FormControl(),
      category: new FormControl()
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
  get name(){
    return this.form.get('businessForm.name');
  }

  ngOnInit() {
  }

  toggleUser(){
    this.isBusiness= !this.isBusiness;
  }

  register(){
    if(this.isBusiness){
      let business:Business = {
        id:"string",
        //key:string;
        name: this.businessName,
        lat: this.lati,
        lng: this.long,
        category: this.category,
        capacity: this.capacity,
        isActive: true,
        stats: [],
      }
      console.log(business);
      //this._businessService.addBusiness(business);
    }
    
  }

  validForm(){
    if(this.isBusiness){
      return !this.form.valid;
    }else{
      return !this.form.get("userForm").valid;
    }
  }

}
