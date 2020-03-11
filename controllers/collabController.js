const collabQueries = require('../db/queries.collabs.js');

module.exports = {
    create(req, res) {
        let collab = {
            userId: +req.body.userId,
            listId: req.body.listId
        };
        collabQueries.createCollab(req, collab, (err, collab) => {
            if (err) {
                res.send(err);
            } else {
                res.send(collab);
            }
        });
    },
    delete(req, res) {
        collabQueries.deleteCollab(
            req,
            req.query.userId,
            req.query.collabId,
            req.query.listId,
            (err, collab) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(collab);
                }
            }
        );
    }
};
