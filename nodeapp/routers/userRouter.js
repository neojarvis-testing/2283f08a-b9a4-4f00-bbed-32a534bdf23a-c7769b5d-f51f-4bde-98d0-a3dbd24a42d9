const express=require('express')
const { addUser, getUserByEmailAndPassword } = require('../controllers/userController')
const router=express.Router()

router.post('/signup',addUser)
router.post('/login',getUserByEmailAndPassword)
module.exports=router