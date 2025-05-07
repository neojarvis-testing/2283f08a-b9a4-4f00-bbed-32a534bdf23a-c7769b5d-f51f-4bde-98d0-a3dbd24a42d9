const express=require('express')
const { addUser, getUserByEmailAndPassword } = require('../controllers/userController')
const router=express.Router()

<<<<<<< HEAD
const {getUserByEmailAndPassword,addUser}=require('../controllers/userController')

router.post('/signup',addUser)
router.post('/login',getUserByEmailAndPassword)

=======
router.post('/signup',addUser)
router.post('/login',getUserByEmailAndPassword)
>>>>>>> main
module.exports=router