import { Observable } from 'rxjs/Rx';
import { Business } from '../../../../models/business/business.class';
import { BusinessService } from '../../../../services/business.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ahn-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
 private searchTerms=new Subject<string>();
businesses:Observable<Business[]>;

  constructor(private businessService:BusinessService) { 


   // .businesses.forEach(element=> {
    // for(var i = 0; i<element.length;i++){
      //  this.businesses=element; 
      
    //   }
    //  });
     
     

  }

  ngOnInit():void {

  //   this.businessService
  //   .getBusinesses()
  //   .subscribe((response=>{
    
  //     this.businesses=response;
  //     console.log(this.businesses);

  //   }).bind(this));
    
  //   setTimeout(function() {
  //     console.log(this.businesses);   
  //   }.bind(this), 5000);

  // console.log(this.businesses);

  this.businesses=this.searchTerms
  .delay(300)
  .distinctUntilChanged()
  .switchMap(term=>term
  ? this.businessService.search(term):Observable.of<Business[]>([]))
  .catch(error=>{
    console.log(error);
    return Observable.of<Business[]>([]);
  });
  }


  search(term:string):void{
    this.searchTerms.next(term);
  }

  
}
