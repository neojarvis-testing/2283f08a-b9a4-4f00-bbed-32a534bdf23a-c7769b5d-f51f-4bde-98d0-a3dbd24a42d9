import { TestBed } from '@angular/core/testing';

import { WorkoutrequestService } from './workoutrequest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WorkoutrequestService', () => {
  let service: WorkoutrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WorkoutrequestService);
  });

  fit('Frontend_should_create_workoutrequest_service', () => {
    expect(service).toBeTruthy();
  });
  fit('Frontend_workoutrequest_service_should_have_addWorkoutRequest_method', () => {
    expect((service as any).addWorkoutRequest).toBeDefined();
  });
  fit('Frontend_workoutrequest_service_should_have_getAllWorkoutRequests_method', () => {
    expect((service as any).getAllWorkoutRequests).toBeDefined();
  });
});
