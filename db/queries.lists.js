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
    deleteList(data, req, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        if (authorized) {
            return List.findByPk(data.listId)
                .then(list => {
                    if (+list.userId === +data.userId) {
                        list.destroy();
                    }
                })
                .then(() => {
                    return List.findAll({
                        where: { userId: data.userId },
                        include: [
                            {
                                model: Item,
                                as: 'items'
                            }
                        ]
                    }).then(lists => {
                        if (lists && lists.length > 0) {
                            callback(null, lists);
                        } else {
                            return List.create({
                                description: 'New list',
                                userId: data.userId
                            }).then(() => {
                                return List.findAll({
                                    where: { userId: data.userId },
                                    include: [
                                        {
                                            model: Item,
                                            as: 'items'
                                        }
                                    ]
                                }).then(lists => {
                                    callback(null, lists);
                                });
                            });
                        }
                    });
                })
                .catch(err => {
                    callback(err);
                });
        }
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
                    if (lists && lists.length > 0) {
                        callback(null, lists);
                    } else {
                        return List.create({
                            description: 'New list',
                            userId
                        }).then(() => {
                            return List.findAll({
                                where: { userId },
                                include: [
                                    {
                                        model: Item,
                                        as: 'items'
                                    }
                                ]
                            }).then(lists => {
                                callback(null, lists);
                            });
                        });
                    }
                })
                .catch(err => {
                    callback(err);
                });
        }
        callback('not authorized');
    }
};
