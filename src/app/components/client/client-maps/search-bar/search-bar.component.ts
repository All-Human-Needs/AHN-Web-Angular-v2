import { Observable } from 'rxjs/Rx';
import { Business } from '../../../../models/business/business.class';
import { BusinessService } from '../../../../services/business.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ahn-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  
})
export class SearchBarComponent implements OnInit {
 private searchTerms=new Subject<string>();
businesses:Observable<Business[]>;


query=''

select(item){
  this.query=item
  // console.log(this.query)
  this.initSuggestions();
  


}


  constructor(private businessService:BusinessService) { 


   // .businesses.forEach(element=> {
    // for(var i = 0; i<element.length;i++){
      //  this.businesses=element; 
      
    //   }
    //  });
     
     

  }

  initSuggestions() {
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

  ngOnInit():void {
    this.initSuggestions();
  }


  search(term:string):void{
    this.searchTerms.next(term);
  }

  fillInput(searchBar:HTMLInputElement){

  
  }
  
}
