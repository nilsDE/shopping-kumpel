const { Item } = require('./models');
const Authorizer = require('../policies/application');

module.exports = {
    async createItem(newItem, req, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        if (authorized) {
            try {
                const item = await Item.create({
                    description: newItem.description,
                    completed: newItem.completed,
                    lastModified: newItem.lastModified,
                    listId: newItem.listId
                });

                callback(null, item);
            } catch (err) {
                callback(err);
            }
        }
        callback('not authorized');
    },
    async getAllItems(req, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        if (authorized) {
            try {
                const items = await Item.findAll();
                callback(null, items);
            } catch (err) {
                callback(err);
            }
        }
        callback('not authorized');
    },
    async update(updatedItem, req, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        if (authorized) {
            try {
                const item = await Item.findByPk(updatedItem.id);
                if (!item) {
                    return callback('Not found!');
                }
                const updateItem = await item.update(updatedItem, {
                    fields: Object.keys(updatedItem)
                });
                callback(null, updateItem);
            } catch (err) {
                callback(err);
            }
        }
        callback('not authorized');
    },
    async delete(itemToDelete, req, callback) {
        const authorized = new Authorizer(req.user).isAllowed();
        if (authorized) {
            try {
                const item = await Item.findByPk(itemToDelete.id);

                const destroy = await item.destroy();

                callback(null, item);
            } catch (err) {
                callback(err);
            }
        }
        callback('not authorized');
    }
};
