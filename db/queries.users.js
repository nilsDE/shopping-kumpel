const bcrypt = require('bcryptjs');
const { User } = require('./models');

module.exports = {
    createUser(newUser, callback) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);
        return User.create({
            name: newUser.name,
            email: newUser.email,
            password: hashedPassword
        })
            .then(user => {
                callback(null, user);
            })
            .catch(err => {
                callback(err);
            });
    },
    getUser(req, callback) {
        return User.findOne({ where: { email: req.body.email } })
            .then(user => callback(null, user))
            .catch(err => callback(err));
    }
};
