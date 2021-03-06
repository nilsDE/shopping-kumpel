const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { List, Collab, Item, User, Vocabulary } = require('../db/models');

const getAllLists = async (req) => {
    const lists = await List.findAll({
        where: {
            [Op.or]: [{ userId: req.user.id }, { '$collabs.userId$': req.user.id }],
        },
        include: [
            {
                model: Vocabulary,
                as: 'vocabularies',
                attributes: ['id', 'lang1', 'lang2', 'listId'],
            },
            {
                model: Item,
                as: 'items',
            },
            {
                model: Collab,
                as: 'collabs',
                required: false,
                include: [
                    {
                        model: User,
                        attributes: ['name', 'id'],
                    },
                ],
            },
            {
                model: User,
                attributes: ['name', 'id'],
            },
        ],
    });
    return lists;
};

exports.getAllLists = getAllLists;
