const mongoose = require('mongoose');

const workoutRequestSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    workoutId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Workout'
    },
    age:{
        type:Number,
        required:true,
        min:1,
        max:120
    },
    bmi:{
        type:Number,
        required:true,
        min:10,
        max:50
    },
    gender:{
        type:String,
        required:true
    },
    dietaryPreferences:{
        type:String,
        required:true
    },
    medicalHistory:{
        type:String,
        required:true
    },
    requestedDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    requestStatus:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('WorkoutRequest', workoutRequestSchema);


