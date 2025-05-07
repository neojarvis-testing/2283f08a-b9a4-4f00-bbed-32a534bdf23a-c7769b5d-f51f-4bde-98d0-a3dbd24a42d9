const express=require('express')
const router=express.Router()
const {getAllWorkouts,getWorkoutById,addWorkout,updateWorkout,deleteWorkout}=require('../controllers/workoutController')

router.get('/getAllWorkouts',getAllWorkouts)
router.get('/getWorkoutById/:id',getWorkoutById)
router.post('/addWorkout',addWorkout)
router.put('/updateWorkout/:id',updateWorkout)
router.delete('/deleteWorkout/:id',deleteWorkout)

module.exports=router