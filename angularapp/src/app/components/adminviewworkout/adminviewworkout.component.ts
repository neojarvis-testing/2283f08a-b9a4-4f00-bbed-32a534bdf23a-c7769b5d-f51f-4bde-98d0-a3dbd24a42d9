import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-adminviewworkout',
  templateUrl: './adminviewworkout.component.html',
  styleUrls: ['./adminviewworkout.component.css']
})
export class AdminviewworkoutComponent implements OnInit {
  workouts: any[] = [];
  filteredWorkouts: any[] = [];
  searchTerm: string = '';

  columnSettings = [
    { key: 'name', label: 'Workout Name', visible: true },
    { key: 'description', label: 'Description', visible: true },
    { key: 'difficultyLevel', label: 'Difficulty Level', visible: true },
    { key: 'targetArea', label: 'Target Area', visible: true },
    { key: 'daysPerWeek', label: 'Days Per Week', visible: true },
    { key: 'duration', label: 'Duration (Minutes)', visible: true },
    { key: 'createdAt', label: 'Created At', visible: true },
    { key: 'action', label: 'Action', visible: true }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getWorkouts();
  }

  getWorkouts(): void {
    this.http.get<any[]>('http://localhost:8080/workouts').subscribe({
      next: (data) => {
        this.workouts = data;
        this.filteredWorkouts = data;
      },
      error: (err) => {
        console.error('Failed to fetch workouts', err);
      }
    });
  }

  search(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.name.toLowerCase().includes(term) ||
      workout.description.toLowerCase().includes(term)
    );
  }

  applyFilter(level: string): void {
    if (level === 'All') {
      this.filteredWorkouts = [...this.workouts];
    } else {
      this.filteredWorkouts = this.workouts.filter(w => w.difficultyLevel === level);
    }
  }

  deleteWorkout(id: string): void {
    // Add actual delete API call if needed
    this.filteredWorkouts = this.filteredWorkouts.filter(w => w._id !== id);
  }

  isColumnVisible(key: string): boolean {
    return this.columnSettings.find(col => col.key === key)?.visible || false;
  }

  

}
