import { TestBed } from '@angular/core/testing';

import { SalesListStateService } from './sales-list-state.service';

describe('SalesListStateService', () => {
  let service: SalesListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesListStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
