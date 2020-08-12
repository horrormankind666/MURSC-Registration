import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRegisteredCheckPaymentComponent } from './transaction-registered-check-payment.component';

describe('TransactionRegisteredCheckPaymentComponent', () => {
  let component: TransactionRegisteredCheckPaymentComponent;
  let fixture: ComponentFixture<TransactionRegisteredCheckPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionRegisteredCheckPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRegisteredCheckPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
