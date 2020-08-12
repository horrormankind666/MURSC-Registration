import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRegisteredAllComponent } from './transaction-registered-all.component';

describe('TransactionRegisteredAllComponent', () => {
  let component: TransactionRegisteredAllComponent;
  let fixture: ComponentFixture<TransactionRegisteredAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionRegisteredAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRegisteredAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
