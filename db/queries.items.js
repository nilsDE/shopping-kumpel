const Item = require('./models').Item;

module.exports = {
  createItem(newItem, callback) {
    return Item.create({
      description: newItem.description,
      completed: newItem.completed
    }).then(item => {
      callback(null, item);
    }).catch(err => {
      callback(err);
    })
  },
  getAllItems(callback) {
    return Item.findAll()
    .then(items => {
      callback(null, items);
    })
    .catch(err => {
      console.log(err)
      callback(err);
    })
  },
  update(updatedItem, callback) {
    return Item.findByPk(updatedItem.id)
    .then(item => {
      if (!item) {
        return callback('Not found!');
      }
      item.update(updatedItem, {
        fields: Object.keys(updatedItem)
      })
      .then(item => {
        callback(null, item);
      })
      .catch(err => {
        callback(err);
      })
    })
  },
  delete(itemToDelete, callback) {
    return Item.findByPk(itemToDelete.id)
    .then(item => {
      item.destroy()
      .then(res => {
        callback(null, item);
      })
    })
    .catch(err => {
      callback(err);
    })
  }
}