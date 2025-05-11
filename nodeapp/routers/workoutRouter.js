const express=require('express')
const router=express.Router()
const {getAllWorkouts,getWorkoutById,addWorkout,updateWorkout,deleteWorkout}=require('../controllers/workoutController')
const {validateToken}=require('../authUtils')
router.get('/getAllWorkouts',validateToken,getAllWorkouts)
router.get('/getWorkoutById/:id',validateToken,getWorkoutById)
router.post('/addWorkout',validateToken,addWorkout)
router.put('/updateWorkout/:id',validateToken,updateWorkout)
router.delete('/deleteWorkout/:id',validateToken,deleteWorkout)

module.exports=router