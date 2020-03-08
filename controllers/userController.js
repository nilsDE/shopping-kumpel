const userQueries = require('../db/queries.users.js');

module.exports = {
    create(req, res) {
        // let newUser = {
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: req.body.password
        // };
        res.send(req.body);
    }
    // signIn(req, res) {
    //     userQueries.getUser(req, (err, user) => {
    //         if (err) {
    //             req.send(err);
    //             res.redirect('/users/login');
    //         } else {
    //             passport.authenticate('local')(req, res, () => {
    //                 delete user.dataValues.password;
    //                 res.send(user.dataValues);
    //             });
    //         }
    //     });
    // },
    // signOut(req, res) {
    //     req.logout();
    //     res.send('ok');
    // }
};
