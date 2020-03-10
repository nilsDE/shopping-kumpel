const listQueries = require('../db/queries.lists.js');

module.exports = {
    create(req, res) {
        let newList = {
            description: req.body.description,
            userId: req.body.userId
        };
        listQueries.createList(newList, req, (err, list) => {
            if (err) {
                res.send(err);
            } else {
                res.send(list);
            }
        });
    },
    delete(req, res) {
        listQueries.deleteList(req.query, req, (err, lists) => {
            if (err) {
                res.send(err);
            } else {
                res.send(lists);
            }
        });
    }
};
