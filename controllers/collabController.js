const collabQueries = require('../db/queries.collabs.js');

module.exports = {
    index(req, res) {
        console.log(req.query);
        collabQueries.getCollabs(req.query.listId, (err, collabs) => {
            if (err) {
                res.send(err);
            } else {
                res.send(collabs);
            }
        });
    }
};
