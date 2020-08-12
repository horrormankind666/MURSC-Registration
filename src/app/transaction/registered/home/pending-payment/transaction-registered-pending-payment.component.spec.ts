import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRegisteredPendingPaymentComponent } from './transaction-registered-pending-payment.component';

describe('TransactionRegisteredPendingPaymentComponent', () => {
  let component: TransactionRegisteredPendingPaymentComponent;
  let fixture: ComponentFixture<TransactionRegisteredPendingPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionRegisteredPendingPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRegisteredPendingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
