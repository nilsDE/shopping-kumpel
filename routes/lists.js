const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { List, Collab, Item } = require('../db/models');

// @route       GET api/lists
// @desc        Get all lists incl items
// @access      Private

router.get('/', auth, async (req, res) => {
    try {
        const lists = await List.findAll({
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
        let allLists;
        if (lists && lists.length > 0) {
            res.json({ lists });
        } else {
            const newList = await List.create({
                description: 'New list',
                userId: req.user.id
            });
            allLists = [...lists, newList];
            res.json({ allLists });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
