import { SearchBarComponent } from '../search-bar/search-bar.component';

import { SearchService } from "../../../../services/search.service";
import { Component, Input, OnInit } from '@angular/core';
import { BusinessService } from "../../../../services/business.service";
import { Observable } from "rxjs";
import { Business } from "../../../../models/business/business.class";

@Component({
  selector: "best-alternative-list",
  templateUrl: "./best-alternative-list.component.html",
  styleUrls: ["./best-alternative-list.component.css"],
  providers:[SearchBarComponent]
})
export class BestAlternativeListComponent implements OnInit {
hidden:boolean;

  isExpanded: boolean;
  stats;
  num: number[];
  alternativesList: Alternatives[];

  constructor(
    private businessService: BusinessService,
    protected searchService: SearchService,
  ) {}

  ngOnInit() {
    this.bestAlternative();



  
  }

  bestAlternative() {
    this.alternativesList = [];

    this.businessService.getBusinesses().subscribe(
      (changes => {
        this.alternativesList = changes.map((c, i) => {
          return { id: i, name: c.name,lat:c.lat,lng:c.lng, pax: c.stats[c.stats.length - 1].pax };
        });

        this.alternativesList.sort((left, right) => {
          if (left.pax < right.pax) return -1;
          if (left.pax > right.pax) return 1;
          return 0;
        });
        this.alternativesList.splice(3, this.alternativesList.length);
      }).bind(this)
    );
  }

  select(item: Business) {
    this.bestAlternative();

this.searchService.setBusiness(item);

    this.searchService.destinationBusiness.next(item);
    // this.clicked.emit(item);
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  
}

interface Alternatives {
  id: string;
  name: string;
  pax: number;
}
