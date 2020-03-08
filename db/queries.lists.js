const { List, Item, Collab } = require('./models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async createList(newList, req, callback) {
        try {
            const createdList = await List.create({
                description: newList.description,
                userId: newList.userId
            });
            const allLists = await List.findAll({
                where: {
                    [Op.or]: [
                        { userId: createdList.userId },
                        { '$collabs.userId$': createdList.userId }
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
                        where: { userId: createdList.userId },
                        required: false
                    }
                ]
            });
            callback(null, allLists);
        } catch (err) {
            callback(err);
        }
    },
    async deleteList(data, req, callback) {
        try {
            let list = await List.findByPk(data.listId);
            if (+list.userId === +data.userId) {
                list.destroy();
            } else {
                throw 500;
            }
            const allLists = await List.findAll({
                where: {
                    [Op.or]: [
                        { userId: data.userId },
                        { '$collabs.userId$': data.userId }
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
                        where: { userId: data.userId },
                        required: false
                    }
                ]
            });
            if (allLists && allLists.length > 0) {
                callback(null, allLists);
            } else {
                let newList = await List.create({
                    description: 'New list',
                    userId: data.userId
                });
                callback(null, [...allLists, newList]);
            }
        } catch (err) {
            callback('error');
        }
    }
    // async getLists(userId, req, callback) {
    //     try {
    //         const lists = await List.findAll({
    //             where: {
    //                 [Op.or]: [{ userId }, { '$collabs.userId$': userId }]
    //             },
    //             include: [
    //                 {
    //                     model: Item,
    //                     as: 'items'
    //                 },
    //                 {
    //                     model: Collab,
    //                     as: 'collabs',
    //                     where: { userId },
    //                     required: false
    //                 }
    //             ]
    //         });
    //         if (lists && lists.length > 0) {
    //             callback(null, lists);
    //         } else {
    //             const newList = await List.create({
    //                 description: 'New list',
    //                 userId
    //             });
    //             callback(null, [...lists, newList]);
    //         }
    //     } catch (err) {
    //         callback(err);
    //     }
    // }
};
