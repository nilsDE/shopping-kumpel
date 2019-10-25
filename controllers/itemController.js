const itemQueries = require('../db/queries.items.js');

module.exports = {
  create(req, res) {
    let newItem = {
      description: req.body.description,
      completed: req.body.completed
    };
    itemQueries.createItem(newItem, (err, item) => {
      if (err) {
        res.send(err);
      } else {
        res.send('created');
      }
    })
  },
  index(req, res) {
    itemQueries.getAllItems((err, items) => {
      if (err) {
        res.send(err);
      } else {
        res.send(items);
      }
    })
  },
  update(req, res) {
    itemQueries.update(req.body, (err, item) => {
      if (err || item === null) {
        res.send(err)
      } else {
        res.send('changed')
      }
    })
  },
  delete(req, res) {
    itemQueries.delete(req.body, (err, item) => {
      if (err) {
        res.send(err);
      } else {
        res.send('deleted');
      }
    })
  }
}