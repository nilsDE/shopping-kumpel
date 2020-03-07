const Collab = require('./models').Collab;
const User = require('./models').User;
const List = require('./models').List;
const Authorizer = require('../policies/application');

module.exports = {
    async getCollabs(req, id, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        try {
            if (!authorized) {
                throw 401;
            }
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
    },
    async createCollab(req, collab, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        try {
            if (!authorized) {
                throw 401;
            }
            const newCollab = await Collab.create({
                userId: collab.userId,
                listId: collab.listId
            });
            const getCollabsForList = await Collab.findAll({
                where: { listId: collab.listId },
                include: [
                    {
                        model: User
                    }
                ]
            });
            callback(null, getCollabsForList);
        } catch (err) {
            callback(err);
        }
    },
    async deleteCollab(req, userId, collabId, listId, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        try {
            if (!authorized) {
                throw 401;
            }
            const collab = await Collab.findByPk(collabId);
            const list = await List.findByPk(listId);
            if (
                +userId === collab.dataValues.userId ||
                +userId === list.dataValues.userId
            ) {
                const destroy = await collab.destroy();
                callback(null, collab);
            } else {
                throw 401;
            }
        } catch (err) {
            callback(err);
        }
    }
};
