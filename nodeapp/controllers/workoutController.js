// workoutController.js

const Workout = require('../models/workoutModel');

// Function to get all workouts
async function getAllWorkouts(_req, res) {
    try {
        const workouts = await Workout.find();
        if (workouts.length === 0) {
            return res.status(200).json({ message: 'No workouts found' });
        } else {
            return res.status(200).json(workouts);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Function to get a workout by ID
//
async function getWorkoutById(req, res) {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({ message: `No workout with the given ID exists` });
        } else {
            return res.status(200).json(workout);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Function to create a new workout
//Admin can add newWorkouts
async function addWorkout(req, res) {
    try {
        let {workoutName}=req.body;
        workoutName=workoutName.toString()
        const existingWorkout=await Workout.findOne({workoutName});
        if(existingWorkout){
<<<<<<< HEAD
            return res.status(400).json({message: 'Workout with the same name already exists'});
=======
            return res.status(400).json({message:'*Workout with the same name already exists'});
>>>>>>> main
        }
        let {description,difficultyLevel,targetArea,daysPerWeek,averageWorkoutDurationInMinutes,createdAt}=req.body;
        description=description.toString();
        difficultyLevel=difficultyLevel.toString();
        targetArea=targetArea.toString();
        daysPerWeek=daysPerWeek.toString();
        averageWorkoutDurationInMinutes=averageWorkoutDurationInMinutes.toString();
        createdAt=createdAt.toString();
       const workout = await Workout.create({workoutName,description,difficultyLevel,targetArea,daysPerWeek,averageWorkoutDurationInMinutes,createdAt})
        return res.status(200).json({message:"Workout Added Successfully",data:workout});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Function to update a workout by ID
async function updateWorkout(req, res) {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedWorkout) {
            return res.status(200).json({message:"Workout Updated Sucessfully",data:updatedWorkout});
        } else {
            return res.status(404).json({ message: 'Workout not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Function to delete a workout by ID
async function deleteWorkout(req, res) {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(req.params?.id);
        if (deletedWorkout) {
            return res.status(200).json({ message: 'Workout Deleted Successfully' });
        } else {
            return res.status(404).json({ message: 'Workout not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllWorkouts, getWorkoutById, addWorkout, updateWorkout, deleteWorkout};