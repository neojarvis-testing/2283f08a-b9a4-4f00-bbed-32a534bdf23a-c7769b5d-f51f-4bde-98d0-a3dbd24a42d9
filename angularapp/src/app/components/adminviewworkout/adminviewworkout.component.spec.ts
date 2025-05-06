import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewworkoutComponent } from './adminviewworkout.component';

describe('AdminviewworkoutComponent', () => {
  let component: AdminviewworkoutComponent;
  let fixture: ComponentFixture<AdminviewworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminviewworkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
