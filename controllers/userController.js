const passport = require('passport');
const userQueries = require('../db/queries.users.js');

module.exports = {
    create(req, res) {
        console.log('in create');
        let newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        };
        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                req.send(err);
                res.redirect('/users/signup');
            } else {
                passport.authenticate('local')(req, res, () => {
                    delete user.dataValues.password;
                    res.send(user.dataValues);
                });
            }
        });
    },
    signIn(req, res) {
        userQueries.getUser(req, (err, user) => {
            if (err) {
                req.send(err);
                res.redirect('/users/login');
            } else {
                passport.authenticate('local')(req, res, () => {
                    delete user.dataValues.password;
                    res.send(user.dataValues);
                });
            }
        });
    },
    signOut(req, res) {
        req.logout();
        res.send('ok');
    }
};
