const express=require('express')
const router=express.Router()

const {addWorkoutRequest,updateWorkoutRequest,deleteWorkoutRequest,getAllWorkoutRequests,getWorkoutRequestsByUserId,getWorkoutRequestById}=require('../controllers/workoutRequestController')
router.get('/getAllWorkoutRequests',getAllWorkoutRequests)
router.get('/getWorkoutRequestById/:id',getWorkoutRequestById)
router.post('/addWorkoutRequest',addWorkoutRequest)
router.put('/updateWorkoutRequest/:id',updateWorkoutRequest)
router.delete('/deleteWorkoutRequest/:id',deleteWorkoutRequest)
router.get('/user/:id',getWorkoutRequestsByUserId)


module.exports=router