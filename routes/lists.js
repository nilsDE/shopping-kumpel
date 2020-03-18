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

// @route       GET api/lists/collabs
// @desc        Get all collabs
// @access      Private

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

// @route       POST api/lists/collabs
// @desc        Create a new collab
// @access      Private

router.post('/collabs', auth, async (req, res) => {
    try {
        console.log(req.body);
        await Collab.create({
            userId: req.body.collabUserId,
            listId: req.body.listId
        });
        const getCollabsForList = await Collab.findAll({
            where: { listId: req.body.listId },
            include: [
                {
                    model: User
                }
            ]
        });
        res.json({ collabs: getCollabsForList });
        callback(null, getCollabsForList);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route       DELETE api/lists/collabs
// @desc        Delete a collab
// @access      Private

router.delete('/collabs', auth, async (req, res) => {
    try {
        const collab = await Collab.findByPk(req.query.collabId);
        const list = await List.findByPk(req.query.listId);

        console.log(collab);
        if (
            req.user.id === collab.dataValues.userId ||
            req.user.id === list.dataValues.userId
        ) {
            await collab.destroy();
            res.json({ collab });
        } else {
            throw 401;
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route       POST api/lists/items
// @desc        Create an item
// @access      Private

router.post('/items', auth, async (req, res) => {
    try {
        await Item.create({
            description: req.body.description,
            completed: req.body.completed,
            lastModified: req.body.lastModified,
            listId: req.body.listId
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
        res.json({ lists: allLists });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route       PUT api/lists/items
// @desc        Update an item
// @access      Private

router.put('/items', auth, async (req, res) => {
    try {
        const updateObject = {
            description: req.body.description,
            completed: req.body.completed,
            id: 'req.body.id',
            lastModified: req.body.lastModified
        };
        const item = await Item.findByPk(updateObject.id);
        if (!item) {
            throw new Error('Item not found.');
        }
        await item.update(updateObject, {
            fields: Object.keys(updateObject)
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
        res.json({ lists: allLists });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// @route       DELETE api/lists/items
// @desc        Delete an item
// @access      Private

router.delete('/items', auth, async (req, res) => {
    try {
        const item = await Item.findByPk(req.query.id);

        await item.destroy();

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
        res.json({ lists: allLists });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
