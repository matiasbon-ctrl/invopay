import { TestBed } from '@angular/core/testing';

import { AssuranceNotificationService } from './assurance-notification.service';

describe('AssuranceNotificationService', () => {
  let service: AssuranceNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssuranceNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
