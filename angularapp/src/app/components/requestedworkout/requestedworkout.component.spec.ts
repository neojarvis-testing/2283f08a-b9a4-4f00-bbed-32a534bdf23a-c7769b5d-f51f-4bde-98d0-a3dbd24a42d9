import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedworkoutComponent } from './requestedworkout.component';

describe('RequestedworkoutComponent', () => {
  let component: RequestedworkoutComponent;
  let fixture: ComponentFixture<RequestedworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedworkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
