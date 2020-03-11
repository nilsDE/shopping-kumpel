const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { List, Collab, Item, User } = require('../db/models');

// @route       POST api/lists
// @desc        Create a new list
// @access      Private

router.post('/', auth, async (req, res) => {
    try {
        const createdList = await List.create({
            description: req.body.description,
            userId: req.user.id
        });
        res.json({ createdList });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

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

// @route       GET api/lists
// @desc        Get all lists incl items
// @access      Private

router.delete('/', auth, async (req, res) => {
    try {
        const { listId } = req.query;
        let list = await List.findByPk(listId);
        if (list && +list.userId === req.user.id) {
            list.destroy();
        } else {
            res.status(401).send('Not allowed!');
        }
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
        if (allLists && allLists.length > 0) {
            res.json({ allLists });
        } else {
            allLists = await List.create({
                description: 'New list',
                userId: req.user.id
            });
            res.json({ allLists });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/collabs', auth, async (req, res) => {
    try {
        const { listId } = req.query;
        const collabs = await Collab.findAll({
            where: { listId },
            include: [
                {
                    model: User
                }
            ]
        });
        const user = await User.findAll();
        res.json({ collabs, user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
