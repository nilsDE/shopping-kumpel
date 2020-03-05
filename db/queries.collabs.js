const Collab = require('./models').Collab;
const User = require('./models').User;

module.exports = {
    async getCollabs(id, callback) {
        try {
            const getCollabsForList = await Collab.findAll({
                where: { listId: id },
                include: [
                    {
                        model: User
                    }
                ]
            });
            const getUserList = await User.findAll();
            callback(null, [getCollabsForList, getUserList]);
        } catch (err) {
            callback(err);
        }
    }
};
