import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditworkoutComponent } from './admineditworkout.component';

describe('AdmineditworkoutComponent', () => {
  let component: AdmineditworkoutComponent;
  let fixture: ComponentFixture<AdmineditworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmineditworkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
