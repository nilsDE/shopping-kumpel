const collabQueries = require('../db/queries.collabs.js');

module.exports = {
    index(req, res) {
        collabQueries.getCollabs(req.query.listId, (err, collabs) => {
            if (err) {
                res.send(err);
            } else {
                res.send(collabs);
            }
        });
    },
    create(req, res) {
        let collab = {
            userId: req.body.userId,
            listId: req.body.listId
        };
        collabQueries.createCollab(collab, (err, collab) => {
            if (err) {
                res.send(err);
            } else {
                res.send(collab);
            }
        });
    }
};
