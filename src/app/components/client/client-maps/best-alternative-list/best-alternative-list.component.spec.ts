import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestAlternativeListComponent } from './best-alternative-list.component';

describe('BestAlternativeListComponent', () => {
  let component: BestAlternativeListComponent;
  let fixture: ComponentFixture<BestAlternativeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestAlternativeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestAlternativeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
