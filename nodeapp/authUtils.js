// authUtils.js

const jwt = require('jsonwebtoken');
const secretKey = 'asdfghjklwertyui';

// Function to generate a JWT token
function generateToken(userId) {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}

// Middleware function to validate JWT token
const validateToken = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'Authentication failed' });
        }
        const token = header.substring(7);
        jwt.verify(token,secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { generateToken, validateToken };