import { Component, OnInit } from "@angular/core";
import { BusinessService } from "../../../../services/business.service";
import { Observable } from "rxjs";

@Component({
  selector: "best-alternative-list",
  templateUrl: "./best-alternative-list.component.html",
  styleUrls: ["./best-alternative-list.component.css"]
})
export class BestAlternativeListComponent implements OnInit {
  isExpanded: boolean;
  stats;
  num: number[];
  alternativesList: Alternatives[];

  constructor(private businessService: BusinessService) {}

  ngOnInit() {
    this.alternativesList=[];

    this.businessService.getBusinesses().subscribe((changes => {
     
      this.alternativesList = changes.map((c, i) => { 
        return { id: i, name: c.name, pax: c.stats[c.stats.length - 1].pax}
      });

      this.alternativesList.sort((left, right) => {
        if (left.pax < right.pax ) return -1;
        if (left.pax > right.pax ) return 1;
        return 0;
      });
      this.alternativesList.splice(3,this.alternativesList.length)
      console.log(this.alternativesList);

    }).bind(this));
  }




  toggle(){
    this.isExpanded=!this.isExpanded;
  }
}

interface Alternatives {
  id: string;
  name: string;
  pax: number;
}
