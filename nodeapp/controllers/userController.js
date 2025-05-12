// userController.js

const User = require('../models/userModel');
const { generateToken } = require('../authUtils');
const bcrypt = require('bcryptjs')
const sanitizeHtml=require('sanitize-html')


// Function to login user
async function getUserByEmailAndPassword(req, res) {
    try {
        let { email, password } = req.body;
        // email=email.toString()
        const user = await User.findOne({ email:sanitizeHtml(email)});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (user) {
            const token = generateToken(user._id);
            const response = {
                id: user._id,
                userName: user.userName,
                role: user.role,
                token: token,
            };
            return res.status(200).json(response);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Function to register user
async function addUser(req, res) {
    try {
        let { userName, email, mobile, password, role } = req.body;
        // userName=userName.toString()
        // email=email.toString()
        // mobile=mobile.toString()
        // password=password.toString()
        // role=role.toString()
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({ userName, email, mobile, password: hashedPassword, role });
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { getUserByEmailAndPassword, addUser };
