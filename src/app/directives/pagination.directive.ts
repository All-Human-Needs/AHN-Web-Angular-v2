import { Directive, Input, ViewContainerRef, TemplateRef, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[paginateOf]'
})
export class PaginationDirective {

  constructor(private container:ViewContainerRef,private template:TemplateRef<Object>) { }
  @Input("paginateOf")  paginate:number;

  ngOnChanges(changes:SimpleChanges){
    this.container.clear();
    for(let i = 0; i < this.paginate;i++){
        this.container.createEmbeddedView(this.template,new PaginateDirectiveContext(i+1));
    }
}
}
class PaginateDirectiveContext{
  constructor(public $implicit:any){}
}