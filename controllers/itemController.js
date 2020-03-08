const itemQueries = require('../db/queries.items.js');

module.exports = {
    create(req, res) {
        console.log('create item');
        let newItem = {
            description: req.body.description,
            completed: req.body.completed,
            lastModified: req.body.lastModified,
            listId: req.body.listId
        };
        itemQueries.createItem(newItem, req, (err, item) => {
            if (err) {
                res.send(err);
            } else {
                res.send(item);
            }
        });
    },
    update(req, res) {
        itemQueries.update(req.body, req, (err, item) => {
            if (err || item === null) {
                res.send(err);
            } else {
                res.send(item);
            }
        });
    },
    delete(req, res) {
        itemQueries.delete(req.body, req, (err, item) => {
            if (err) {
                res.send(err);
            } else {
                res.send(item);
            }
        });
    }
};
