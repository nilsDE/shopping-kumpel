const { List, Item } = require('./models');
const Authorizer = require('../policies/application');

module.exports = {
    createList(newList, req, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        if (authorized) {
            return List.create({
                description: newList.description,
                userId: newList.userId
            }).then(list => {
                return List.findAll({
                    where: { userId: list.userId },
                    include: [
                        {
                            model: Item,
                            as: 'items'
                        }
                    ]
                })
                    .then(lists => {
                        callback(null, lists);
                    })
                    .catch(err => {
                        callback(err);
                    });
            });
        }
        callback('not authorized');
    },
    getLists(userId, req, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        if (authorized) {
            return List.findAll({
                where: { userId },
                include: [
                    {
                        model: Item,
                        as: 'items'
                    }
                ]
            })
                .then(lists => {
                    callback(null, lists);
                })
                .catch(err => {
                    callback(err);
                });
        }
        callback('not authorized');
    }
};
