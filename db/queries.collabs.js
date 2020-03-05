const Collab = require('./models').Collab;
const List = require('./models').List;
const User = require('./models').User;

module.exports = {
    getCollabs(id, callback) {
        const getCollabsForList = Collab.findAll({
            where: { listId: id },
            include: [
                {
                    model: User
                }
            ]
        });

        const getUserList = User.findAll();

        return Promise.all([getCollabsForList, getUserList])
            .then(result => {
                callback(null, result);
            })
            .catch(err => {
                callback(err);
            });
    }
};
