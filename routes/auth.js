const express = require('express');
const router = express.Router();
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const { User } = require('../db/models');

// @route       GET api/auth
// @desc        Get logged in user / validate
// @access      Private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        delete user.dataValues.password;
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Sorry, there was an error! 😒' });
    }
});

// @route       POST api/auth
// @desc        Auth user & get token
// @access      Public

router.post(
    '/',
    [
        check('email', 'Please include a valid email.').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const existingUser = await User.findOne({
                where: { email }
            });

            if (!existingUser) {
                return res
                    .status(400)
                    .json({ msg: [{ msg: 'User does not exist!' }] });
            }

            const isMatch = await bcrypt.compare(
                password,
                existingUser.password
            );

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ msg: [{ msg: 'Wrong password!' }] });
            }

            const payload = {
                user: {
                    id: existingUser.id
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
