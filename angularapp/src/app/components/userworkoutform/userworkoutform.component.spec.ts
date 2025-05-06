import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserworkoutformComponent } from './userworkoutform.component';

describe('UserworkoutformComponent', () => {
  let component: UserworkoutformComponent;
  let fixture: ComponentFixture<UserworkoutformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserworkoutformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserworkoutformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
