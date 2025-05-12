const express=require('express')
const router=express.Router()
const {validateToken}=require('../authUtils')
const {addWorkoutRequest,updateWorkoutRequest,deleteWorkoutRequest,getAllWorkoutRequests,getWorkoutRequestsByUserId,getWorkoutRequestById}=require('../controllers/workoutRequestController')
router.get('/getAllWorkoutRequests',validateToken,getAllWorkoutRequests)
router.get('/getWorkoutRequestById/:id',validateToken,getWorkoutRequestById)
router.post('/addWorkoutRequest',validateToken,addWorkoutRequest)
router.put('/updateWorkoutRequest/:id',validateToken,updateWorkoutRequest)
router.delete('/deleteWorkoutRequest/:id',validateToken,deleteWorkoutRequest)
router.get('/user/:id',validateToken,getWorkoutRequestsByUserId)


module.exports=router