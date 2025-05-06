import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddworkoutComponent } from './adminaddworkout.component';

describe('AdminaddworkoutComponent', () => {
  let component: AdminaddworkoutComponent;
  let fixture: ComponentFixture<AdminaddworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminaddworkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
