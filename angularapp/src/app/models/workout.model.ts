export interface Workout {
    _id?:string;
    workoutName: string;
    description: string;
    difficultyLevel: number;
    createdAt?: Date;
    targetArea: string;
    daysPerWeek: number;
    averageWorkoutDurationInMinutes: number;
}
