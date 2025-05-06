import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewworkoutComponent } from './userviewworkout.component';

describe('UserviewworkoutComponent', () => {
  let component: UserviewworkoutComponent;
  let fixture: ComponentFixture<UserviewworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewworkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
