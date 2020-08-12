import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRegisteredPaymentCompletedComponent } from './transaction-registered-payment-completed.component';

describe('TransactionRegisteredPaymentCompletedComponent', () => {
  let component: TransactionRegisteredPaymentCompletedComponent;
  let fixture: ComponentFixture<TransactionRegisteredPaymentCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionRegisteredPaymentCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRegisteredPaymentCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
