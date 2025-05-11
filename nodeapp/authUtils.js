// authUtils.js

const jwt = require('jsonwebtoken');
const secretKey = 'asdfghjklwertyui';

// Function to generate a JWT token
function generateToken(userId) {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}

// Middleware function to validate JWT token
function validateToken(req, res, next) {
    const token = req.header('authorization');
    if (!token) {
        return res.status(400).json({ message: 'Authentication failed!' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: 'Authentication failed!' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = { generateToken, validateToken };