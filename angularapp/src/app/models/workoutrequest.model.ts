export interface Workoutrequest {
  _id?:string
  userId: { userName: string };
  workoutId: {
    _id?:string;
    workoutName: string;
    description?: string;
    targetArea?: string;
    averageWorkoutDurationInMinutes?: number;
  };
  age: number;
  bmi: number;
  gender: string;
  dietaryPreferences: string;
  medicalHistory: string;
  requestedDate: Date;
  requestStatus: string;
}
