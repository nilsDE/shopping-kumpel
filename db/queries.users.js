const bcrypt = require('bcryptjs');
const { User } = require('./models');

module.exports = {
    async createUser(newUser, callback) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        try {
            const user = await User.create({
                name: newUser.name,
                email: newUser.email,
                password: hashedPassword
            });
            callback(null, user);
        } catch (err) {
            callback(err);
        }
    },
    async getUser(req, callback) {
        try {
            const user = await User.findOne({
                where: { email: req.body.email }
            });
            callback(null, user);
        } catch (err) {
            callback(err);
        }
    }
};
