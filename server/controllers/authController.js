const User = require('../models/User');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ $or: [{ username }, { email }] });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            username,
            email,
            password,
            role: 'user', // Always default to user
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: user.getSignedJwtToken(),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await user.matchPassword(password))) {
            // Role Validation Logic
            // If user requests 'admin' role, they must BE an admin
            if (role === 'admin' && user.role !== 'admin') {
                return res.status(403).json({ message: 'Access denied: You are not an admin' });
            }

            // If user is admin, they can be 'admin' or 'user' (default to their actual role if not specified)
            // If user is user, they can only be 'user'

            const roleToAssign = role || user.role;

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: roleToAssign,
                token: user.getSignedJwtToken(roleToAssign),
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
