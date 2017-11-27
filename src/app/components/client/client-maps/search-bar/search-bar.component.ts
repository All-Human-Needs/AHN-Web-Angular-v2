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
  firstResult: Business;

  // altBusiness;

  public hidden:boolean=false;

  private searchTerms = new Subject<string>();

  businesses: Observable<Business[]>;

  query = ''


  
    isExpanded: boolean;
    stats;
    num: number[];
    alternativesList: Business[]=[];
  

// bestAltSelected(){
//   this.SearchService.getBusiness().subscribe((business=>
//  this.query=business.name)
//   .bind(this));

// }
  // Method for selecting item in search bar -- START
  select(item: Business) {
    this.query = item.name;
  
    // console.log(this.query)
    this.initSuggestions();
 
this.hidden=true;

    this.SearchService.destinationBusiness.next(item);
    
    // this.clicked.emit(item);
  }
  // Method for selecting item in search bar -- END

  constructor(private businessService: BusinessService, private SearchService: SearchService) {
    
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

      this.businesses.subscribe( (list=> this.firstResult = list[0]).bind(this));
  }
  // initializes search list -- END

  ngOnInit(): void {
    this.initSuggestions();

    this.bestAlternative();

    // console.log(this.businessService.filterKeyword)
    
// this.businessService.filteredBusiness.subscribe(b=>

// console.log(b)

// )
    // this.bestAltSelected();
  }

  search(term: string): void {
    this.searchTerms.next(term);

  }

  bestAlternative() {
    this.alternativesList = [];

    this.businessService.getBusinesses().subscribe(
      (changes => {

        this.alternativesList = changes.map((c, i) => {
          return c as Business;
        });

        this.alternativesList.sort((left, right) => {
          if (left.stats[left.stats.length-1].pax < right.stats[right.stats.length-1].pax) return -1;
          if (left.stats[left.stats.length-1].pax > right.stats[right.stats.length-1].pax) return 1;
          return 0;
        });
        this.alternativesList.splice(3, this.alternativesList.length);
        // console.log(this.alternativesList);
      }).bind(this)
    );
  }


  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}

// interface Alternatives {
//   id: string;
//   name: string;
//   pax: number;
// }
