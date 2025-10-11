import { TestBed } from '@angular/core/testing';

import { RevenuesListStateService } from './revenues-list-state.service';

describe('RevenuesListStateService', () => {
  let service: RevenuesListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevenuesListStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
