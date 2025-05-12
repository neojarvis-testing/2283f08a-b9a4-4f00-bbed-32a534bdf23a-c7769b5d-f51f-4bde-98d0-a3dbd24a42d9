// userController.js

const User = require('../models/userModel');
const { generateToken } = require('../authUtils');

// Function to login user
async function getUserByEmailAndPassword(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
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
        const user = await User.create(req.body)
        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { getUserByEmailAndPassword, addUser };
