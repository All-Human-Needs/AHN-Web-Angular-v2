import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSystemComponent } from './input-system.component';

describe('InputSystemComponent', () => {
  let component: InputSystemComponent;
  let fixture: ComponentFixture<InputSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
