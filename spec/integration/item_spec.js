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
    sequelize.sync({ force: true })
    .then(() => {
      Item.create({
        description: 'Bread',
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

  describe("not logged in user performing CRUD actions for Item", () => {
    beforeEach((done) => {
      request.get({
          url: "http://localhost:5000/auth/fake",
          form: {
            userId: 0
          }
        },
        (err, res, body) => {
          done();
        }
      );
    });
    describe('get all items', () => {
      it('should not return all items from the DB', done => {
        axios.get(`${base}/items`).then(res => {
          expect(res.data).toBe('not authorized');
          done();
        })
      })
    })
    describe('create item', () => {
      it('should create a new item', done => {
        axios.post(`${base}/create`, {
          description: 'Cake',
          completed: false
        })
        .then(res => {
          expect(res.data).toBe('not authorized');
          done();
        })
      })
    })
    describe('update item', () => {
      it('should update the item', done => {
        axios.post(`${base}/update`, {
          description: 'Ham',
          completed: false,
          id: 1
        })
        .then(res => {
          expect(res.data).toBe('not authorized');
          done();
        })
      })
    })
    describe('delete item', () => {
      it('should delete the item', done => {
        axios.post(`${base}/delete`,{
          id: 1
        })
        .then(res => {
          expect(res.data).toBe('not authorized');
          done();
        })
      })
    })
  })

  describe("logged in user performing CRUD actions for Item", () => {
    beforeEach(done => {
      authorizeUser(done);
    });
    describe('get all items', () => {
      it('should return all items from the DB', done => {
        axios.get(`${base}/items`).then(res => {
          expect(res.data[0].description).toBe('Bread');
          expect(res.data[0].completed).toBe(false);
          done();
        })
      })
    })
    describe('create item', () => {
      it('should create a new item', done => {
        axios.post(`${base}/create`, {
          description: 'Salami',
          completed: false
        })
        .then(res => {
          expect(res.data).toContain('created');
          done();
        })
      })
    })
    describe('update item', () => {
      it('should update the item', done => {
        axios.post(`${base}/update`, {
          description: 'Ham',
          completed: false,
          id: 1
        })
        .then(res => {
          expect(res.data).toContain('changed');
          done();
        })
      })
    })
    describe('delete item', () => {
      it('should delete the item', done => {
        axios.post(`${base}/delete`,{
          id: 1
        })
        .then(res => {
          expect(res.data).toContain('deleted');
          done();
        })
      })
    })
  })
})