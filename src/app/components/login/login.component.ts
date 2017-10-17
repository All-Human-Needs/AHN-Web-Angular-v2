import { BusinessService } from '../../services/business.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ahn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  constructor(private businessService:BusinessService, private router:Router) {
    businessService.getBusinesses(); 

}

  ngOnInit() {
  }


  login():void{
    
    //validate login
    if(this.username==='adminB' && this.password==='admin'){
      //go to next page
      this.router.navigateByUrl('/business-home');
    }else if(this.username==='adminC' && this.password==='admin'){
      //go to next page
      this.router.navigateByUrl('/client-home');
    }else{
      console.log(this.username+'\n'+this.password)
    }
    
  }



  googleLogin():void{
    //validate login

    //go to next page
    this.router.navigateByUrl('/client-home');
  }

  rememberMe():void{

  }
}
