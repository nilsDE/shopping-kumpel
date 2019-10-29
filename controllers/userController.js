const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
  create(req, res, next) {
    console.log('in create')
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/signup");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send('ok')
        })
      }
    });
  },
  signIn(req, res, next){
    passport.authenticate("local")(req, res, function () {
      if(!req.user){
        res.redirect("/users/login");
      } else {
        res.send('ok')
      }
    })
  },
  signOut(req, res, next) {
    req.logout();
    res.send('ok')
  },
};