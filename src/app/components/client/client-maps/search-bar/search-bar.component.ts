import { SearchService } from '../../../../services/search.service';
import { Business } from './../../../../models/business/business.class';
import { Observable } from 'rxjs/Rx';
import { BusinessService } from '../../../../services/business.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'ahn-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],

})

export class SearchBarComponent implements OnInit {
  // @Output() clicked = new EventEmitter;

  private searchTerms = new Subject<string>();
  businesses: Observable<Business[]>;

  query = ''

  // Method for selecting item in search bar -- START
  select(item: Business) {
    this.query = item.name;
    // console.log(this.query)
    this.initSuggestions();

    this.SearchService.setBusiness(item);
    // this.clicked.emit(item);
  }
  // Method for selecting item in search bar -- END

  constructor(private businessService: BusinessService, private SearchService: SearchService) {
    // .businesses.forEach(element=> {
    // for(var i = 0; i<element.length;i++){
    //  this.businesses=element; 

    //   }
    //  });
  }

  // initializes search list -- START
  initSuggestions() {
    this.businesses = this.searchTerms
      .delay(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.businessService.search(term) : Observable.of<Business[]>([]))
      .catch(error => {
        console.log(error);
        return Observable.of<Business[]>([]);
      });
  }
  // initializes search list -- END

  ngOnInit(): void {
    this.initSuggestions();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}