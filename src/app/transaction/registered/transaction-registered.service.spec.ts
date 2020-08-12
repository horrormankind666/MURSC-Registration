import { TestBed } from '@angular/core/testing';

import { TransactionRegisteredService } from './transaction-registered.service';

describe('TransactionRegisteredService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionRegisteredService = TestBed.get(TransactionRegisteredService);
    expect(service).toBeTruthy();
  });
});
