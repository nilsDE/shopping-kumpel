const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { List, Collab, Item, User } = require('../db/models');
const helper = require('./helper');

function onError(res, err) {
    console.error(err);
    let code = 500;
    let msg = 'Sorry, there was an error! 😒';
    if (err.code) {
        code = err.code;
    }
    if (err.msg) {
        msg = err.msg;
    }
    res.status(code).json({ msg });
}

// @route       POST api/lists
// @desc        Create a new list
// @access      Private

router.post('/', auth, async (req, res) => {
    try {
        await List.create({
            description: req.body.description,
            listType: req.body.listType,
            userId: req.user.id,
        });
        const allLists = await helper.getAllLists(req);
        res.json({ allLists, msg: 'Saved!' });
    } catch (err) {
        onError(res, err);
    }
});

// @route       PUT api/lists
// @desc        Update new list
// @access      Private

router.put('/', auth, async (req, res) => {
    try {
        const list = await List.findByPk(req.body.id);
        if (!list) {
            throw { msg: 'List not found.', code: 500 };
        }
        await list.update({ description: req.body.description });

        const allLists = await helper.getAllLists(req);
        res.json({ allLists, msg: 'Saved!' });
    } catch (err) {
        onError(res, err);
    }
});

// @route       GET api/lists
// @desc        Get all lists incl items
// @access      Private

router.get('/', auth, async (req, res) => {
    try {
        const lists = await helper.getAllLists(req);

        if (lists && lists.length > 0) {
            res.json({ lists });
        } else {
            await List.create({
                description: 'New list',
                listType: 1,
                userId: req.user.id,
            });
            const lists = await helper.getAllLists(req);
            res.json({ lists });
        }
    } catch (err) {
        onError(res, err);
    }
});

// @route       DELETE api/lists
// @desc        Delete a list incl items
// @access      Private

router.delete('/', auth, async (req, res) => {
    try {
        const { listId } = req.query;
        let list = await List.findByPk(listId);
        if (list && +list.userId === req.user.id) {
            await list.destroy();
        } else {
            // res.status(401).json({ msg: 'You are not authorized!' });
            throw { msg: 'You are not authorized!', code: 401 };
        }
        const allLists = await helper.getAllLists(req);

        if (allLists && allLists.length > 0) {
            res.json({ allLists, msg: 'Deleted!' });
        } else {
            allLists = await List.create({
                description: 'New list',
                listType: 1,
                userId: req.user.id,
            });
            res.json({ allLists, msg: 'Deleted!' });
        }
    } catch (err) {
        onError(res, err);
    }
});

// @route       POST api/lists/collabs
// @desc        Create a new collab
// @access      Private

router.post('/collabs', auth, async (req, res) => {
    try {
        await Collab.create({
            userId: req.body.collabUserId,
            listId: req.body.listId,
        });
        const getCollabsForList = await Collab.findAll({
            where: { listId: req.body.listId },
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
            ],
        });
        res.json({ collabs: getCollabsForList, listId: req.body.listId, msg: 'Added!' });
        callback(null, getCollabsForList);
    } catch (err) {
        onError(res, err);
    }
});

// @route       DELETE api/lists/collabs
// @desc        Delete a collab
// @access      Private

router.delete('/collabs', auth, async (req, res) => {
    try {
        const collab = await Collab.findByPk(req.query.collabId);
        const list = await List.findByPk(req.query.listId);
        if (req.user.id === collab.dataValues.userId || req.user.id === list.dataValues.userId) {
            await collab.destroy();
            const allCollabs = await Collab.findAll({
                where: { listId: req.query.listId },
                include: [
                    {
                        model: User,
                        attributes: ['name', 'id'],
                    },
                ],
            });
            res.json({ collabs: [...allCollabs], listId: +req.query.listId, msg: 'Deleted!' });
        } else {
            throw { msg: 'You are not authorized!', code: 401 };
        }
    } catch (err) {
        onError(res, err);
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
            listId: req.body.listId,
        });
        const allLists = await helper.getAllLists(req);

        res.json({ lists: allLists, msg: 'Saved!' });
    } catch (err) {
        onError(res, err);
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
            id: req.body.id,
            lastModified: req.body.lastModified,
        };
        const item = await Item.findByPk(updateObject.id);
        if (!item) {
            throw { msg: 'Item not found.', code: 500 };
        }
        await item.update(updateObject, {
            fields: Object.keys(updateObject),
        });
        const allLists = await helper.getAllLists(req);

        res.json({ lists: allLists, msg: 'Updated!' });
    } catch (err) {
        onError(res, err);
    }
});

// @route       DELETE api/lists/items
// @desc        Delete an item
// @access      Private

router.delete('/items', auth, async (req, res) => {
    try {
        const item = await Item.findByPk(req.query.id);
        await item.destroy();
        const allLists = await helper.getAllLists(req);
        res.json({ lists: allLists, msg: 'Deleted!' });
    } catch (err) {
        onError(res, err);
    }
});

// @route       GET api/lists/users
// @desc        Get all collabs
// @access      Private

router.get('/users', auth, async (req, res) => {
    try {
        const user = await User.findAll();
        res.json({ user });
    } catch (err) {
        onError(res, err);
    }
});

module.exports = router;
