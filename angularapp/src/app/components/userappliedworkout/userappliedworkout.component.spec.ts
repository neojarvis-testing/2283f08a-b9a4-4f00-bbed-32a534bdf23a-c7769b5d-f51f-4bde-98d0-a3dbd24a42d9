import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserappliedworkoutComponent } from './userappliedworkout.component';

describe('UserappliedworkoutComponent', () => {
  let component: UserappliedworkoutComponent;
  let fixture: ComponentFixture<UserappliedworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserappliedworkoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserappliedworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
