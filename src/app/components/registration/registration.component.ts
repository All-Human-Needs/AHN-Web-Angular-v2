import { PasswordValidators } from '../../models/password.validators';
import { UserService } from '../../services/user.service';
import { preparseElement } from '@angular/compiler/src/template_parser/template_preparser';
import { Stats } from '../../models/business/stats.class';
import { AuthenticationService } from '../../services/authentication.service';
import { Business } from '../../models/business/business.class';
import { BusinessService } from '../../services/business.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  emailAddress:string;
  pwd:string;
  isBusiness:boolean = false;
  //id:string;
  //key:string;
  businessName:string;
  lati:string;
  long:string;
  category:string ="bank";
  capacity:number =10;
  //isActive:true;
  //stats: Stats[];

form:FormGroup

  constructor(private _businessService:BusinessService,private _authenticationService:AuthenticationService,private _userService:UserService,fb:FormBuilder) {
    this.form = fb.group({
      userForm : fb.group({
        email:['',[Validators.required,Validators.email]],
        passwordForm: fb.group({  
        password:['',[Validators.required,Validators.minLength(8)]],
        confirmPwrd:['',Validators.required]}, 
        {
          validator: PasswordValidators.passwordMatches
        }),
      },
     ),
      businessForm: fb.group({
        name:['',[Validators.required,Validators.minLength(3)]],
        lat:['',[Validators.required,Validators.pattern("^[0-9]+$")]],
        lng:['',[Validators.required,Validators.pattern("^[0-9]+$")]],
        capacity:[],
        category:[]
      })
    })
   }

 


  // form = new FormGroup({
  //   userForm: new FormGroup({ 
  //     email: new FormControl('',[Validators.required,Validators.email]),
  //     password: new FormControl('',[Validators.required,Validators.minLength(8)]),
  //     confirmPwrd:new FormControl('',[Validators.required,Validators.pattern('1234')]),
  //   },{
  //     validator: PasswordValidators.passwordMatches
  //   }),
  //   businessForm: new FormGroup({
  //     name: new FormControl('',[Validators.required,Validators.minLength(3)]),
  //     lat: new FormControl('',[Validators.required,Validators.pattern("^[0-9]+$")]),
  //     lng: new FormControl('',[Validators.required,Validators.pattern("^[0-9]+$")]),
  //     capacity:new FormControl(),
  //     category: new FormControl()
  //   }),
    
  // });

  get email(){
    return this.form.get('userForm.email');
  }

  get password(){
    return this.form.get('userForm.passwordForm.password');
  }

  get passwordForm(){
    return this.form.get('userForm.passwordForm');
  }

  get confirmPwrd(){
    return this.form.get('userForm.passwordForm.confirmPwrd');
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
    let isBusiness;
    if(this.isBusiness){ 
       isBusiness=true;
      let newDate = new Date().toString();
      let business:Business = {
        id:"",
        name: this.businessName,
        lat: parseFloat(this.lati) ,
        lng: parseFloat(this.long) ,
        category: this.category,
        capacity: this.capacity,
        isActive: true,
        stats: [{pax:0,date:newDate}],
      }
      this._authenticationService.createUser(this.emailAddress,this.pwd,isBusiness,business);

    }else{
      isBusiness =false;
      this._authenticationService.createUser(this.emailAddress,this.pwd,isBusiness);
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
