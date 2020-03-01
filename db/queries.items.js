const { Item } = require('./models');
const Authorizer = require('../policies/application');

module.exports = {
    createItem(newItem, req, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        if (authorized) {
            return Item.create({
                description: newItem.description,
                completed: newItem.completed,
                lastModified: newItem.lastModified,
                listId: newItem.listId
            })
                .then(item => {
                    callback(null, item);
                })
                .catch(err => {
                    callback(err);
                });
        }
        callback('not authorized');
    },
    getAllItems(req, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        if (authorized) {
            return Item.findAll()
                .then(items => {
                    callback(null, items);
                })
                .catch(err => {
                    callback(err);
                });
        }
        callback('not authorized');
    },
    update(updatedItem, req, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        if (authorized) {
            return Item.findByPk(updatedItem.id).then(item => {
                if (!item) {
                    return callback('Not found!');
                }
                item.update(updatedItem, {
                    fields: Object.keys(updatedItem)
                })
                    .then(item => {
                        callback(null, item);
                    })
                    .catch(err => {
                        callback(err);
                    });
            });
        }
        callback('not authorized');
    },
    delete(itemToDelete, req, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        if (authorized) {
            return Item.findByPk(itemToDelete.id)
                .then(item => {
                    item.destroy().then(res => {
                        callback(null, item);
                    });
                })
                .catch(err => {
                    callback(err);
                });
        }
        callback('not authorized');
    }
};
