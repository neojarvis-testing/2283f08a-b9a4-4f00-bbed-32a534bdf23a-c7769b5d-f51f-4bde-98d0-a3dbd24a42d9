const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  workoutName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficultyLevel: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  targetArea: {
    type: String,
    required: true
  },
  daysPerWeek:{
    type:Number,
    required:[true,'Days per week is required']
  },
  averageWorkoutDurationInMinutes:{
    type:Number,
    required:true
  }
});

module.exports = mongoose.model('Workout', workoutSchema);
