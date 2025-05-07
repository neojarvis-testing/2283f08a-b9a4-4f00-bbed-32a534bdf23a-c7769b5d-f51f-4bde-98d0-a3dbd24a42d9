export interface Workout {
    workoutName: string;
    description: string;
    difficultyLevel: string;
    createdAt?: Date;
    targetArea: string;
    daysPerWeek: number;
    averageWorkoutDurationInMinutes: number;
}
