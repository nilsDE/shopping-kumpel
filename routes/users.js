const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { User } = require('../db/models');

// @route       POST api/users
// @dec         Register a user
// @access      Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email.').isEmail(),
        check(
            'password',
            'Please enter a password with at least 6 characters'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            const exitingUser = await User.findOne({
                where: { email }
            });

            if (exitingUser) {
                return res
                    .status(400)
                    .json({ msg: [{ msg: 'User already exists! 😒' }] });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await User.create({
                name,
                email,
                password: hashedPassword
            });

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.jwtSecret,
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).json({
                msg: [{ msg: 'Sorry, there was an error! 😒' }]
            });
        }
    }
);

module.exports = router;
