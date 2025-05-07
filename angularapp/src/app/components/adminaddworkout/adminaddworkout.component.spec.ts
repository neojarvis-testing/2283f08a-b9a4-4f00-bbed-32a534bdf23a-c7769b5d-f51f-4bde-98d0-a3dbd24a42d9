import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminaddworkoutComponent } from './adminaddworkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('AdminaddworkoutComponent', () => {
  let component: AdminaddworkoutComponent;
  let fixture: ComponentFixture<AdminaddworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminaddworkoutComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_adminaddworkout_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_create_new_workout_heading_in_the_adminaddworkout_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Create New Workout');
  });
  fit('Frontend_should_verify_the_existence_of_input_fields_by_placeholder_adminaddworkout_component', () => {
    const workoutNameInput = fixture.debugElement.query(By.css('input[placeholder="Workout Name"]'));
    const descriptionInput = fixture.debugElement.query(By.css('input[placeholder="Workout Description"]'));
    const difficultyLevelInput = fixture.debugElement.query(By.css('input[placeholder="Difficulty Level"]'));
    const targetAreaSelect = fixture.debugElement.query(By.css('select[name="targetArea"]'));
    const daysPerWeekInput = fixture.debugElement.query(By.css('input[placeholder="Days Per Week"]'));
    const workoutDurationInput = fixture.debugElement.query(By.css('input[placeholder="Workout Duration in Minutes"]'));

    expect(workoutNameInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(difficultyLevelInput).toBeTruthy();
    expect(targetAreaSelect).toBeTruthy();
    expect(daysPerWeekInput).toBeTruthy();
    expect(workoutDurationInput).toBeTruthy();
});

});
