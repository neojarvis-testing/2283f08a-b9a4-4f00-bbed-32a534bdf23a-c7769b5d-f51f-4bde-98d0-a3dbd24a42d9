import { TestBed } from '@angular/core/testing';

import { WorkoutrequestService } from './workoutrequest.service';

describe('WorkoutrequestService', () => {
  let service: WorkoutrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
