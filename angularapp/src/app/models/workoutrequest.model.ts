export interface Workoutrequest {
    userId: { userName: string };
    workoutId: {
      workoutName: string;
      description?: string;
      targetArea?: string;
      duration?: number;
    };
    age: number;
    bmi: number;
    gender: string;
    dietaryPreferences: string;
    medicalHistory: string;
    requestedDate: Date;
    requestStatus: string;
  }
  