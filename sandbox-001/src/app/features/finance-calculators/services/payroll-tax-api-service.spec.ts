import { TestBed } from '@angular/core/testing';

import { PayrollTaxApiService } from './payroll-tax-api-service';

describe('PayrollTaxApiService', () => {
  let service: PayrollTaxApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrollTaxApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
