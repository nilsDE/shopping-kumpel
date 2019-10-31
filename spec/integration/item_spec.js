const request = require('request');
const base = "http://localhost:5000";
const User = require('../../db/models').User;
const sequelize = require('../../db/models/index').sequelize;
const Item = require('../../db/models').Item;
const axios = require('axios');

function authorizeUser(done) {
  User.create({
    email: 'test@aol.com',
    password: "123456",
    name: 'Dr Test'
  })
  .then(user => {
    request.get({
      url: "http://localhost:5000/auth/fake",
      form: {
        name: user.name,
        userId: user.id,
        email: user.email
      }
    },
      (err, res, body) => {
        done();
      }
    );
  });
}

describe('Item', () => {
  beforeEach(done => {
    this.item;
    sequelize.sync({ force: true }).then(() => {
      Item.create({
        description: 'Sugar',
        completed: false
      }).then(res => {
        this.item = res;
        done();
      }).catch(err => {
        console.log(err);
        done();
      });
    });
  });

  describe("logged in user performing CRUD actions for Item", () => {
    // beforeEach(done => {
    //   authorizeUser(done);
    // });
    describe('get all items', () => {
      it('should return all items from the DB', done => {
        axios.get(`${base}/items`).then(res => {
          console.log(res.data);
          done();
        })
      })
    })
  })
})