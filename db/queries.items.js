const { Item, List, Collab } = require('./models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async createItem(newItem, req, callback) {
        try {
            const item = await Item.create({
                description: newItem.description,
                completed: newItem.completed,
                lastModified: newItem.lastModified,
                listId: newItem.listId
            });
            console.log(req.user.id);
            const allLists = await List.findAll({
                where: {
                    [Op.or]: [
                        { userId: req.user.id },
                        { '$collabs.userId$': req.user.id }
                    ]
                },
                include: [
                    {
                        model: Item,
                        as: 'items'
                    },
                    {
                        model: Collab,
                        as: 'collabs',
                        where: { userId: req.user.id },
                        required: false
                    }
                ]
            });
            console.log(allLists);
            callback(null, allLists);
        } catch (err) {
            console.log(err);
            callback(err);
        }
    },
    async update(updatedItem, req, callback) {
        try {
            const item = await Item.findByPk(updatedItem.id);
            if (!item) {
                return callback('Not found!');
            }
            const updateItem = await item.update(updatedItem, {
                fields: Object.keys(updatedItem)
            });
            const allLists = await List.findAll({
                where: {
                    [Op.or]: [
                        { userId: req.user.id },
                        { '$collabs.userId$': req.user.id }
                    ]
                },
                include: [
                    {
                        model: Item,
                        as: 'items'
                    },
                    {
                        model: Collab,
                        as: 'collabs',
                        where: { userId: req.user.id },
                        required: false
                    }
                ]
            });
            callback(null, allLists);
        } catch (err) {
            callback(err);
        }
    },
    async delete(itemToDelete, req, callback) {
        try {
            const item = await Item.findByPk(itemToDelete.id);

            const destroy = await item.destroy();

            const allLists = await List.findAll({
                where: {
                    [Op.or]: [
                        { userId: req.user.id },
                        { '$collabs.userId$': req.user.id }
                    ]
                },
                include: [
                    {
                        model: Item,
                        as: 'items'
                    },
                    {
                        model: Collab,
                        as: 'collabs',
                        where: { userId: req.user.id },
                        required: false
                    }
                ]
            });

            callback(null, allLists);
        } catch (err) {
            callback(err);
        }
    }
};
