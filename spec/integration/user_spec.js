const axios = require('axios');

const base = 'http://localhost:5000';
const { sequelize } = require('../../db/models/index');

describe('users', () => {
  beforeEach(done => {
    sequelize
      .sync({
        force: true
      })
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe('POST /users', () => {
    it('should create a new user', done => {
      axios
        .post(`${base}/users`, {
          name: 'Test Person',
          email: 'test@test.com',
          password: 'supersecretpassword'
        })
        .then(res => {
          expect(res.data).toBe('ok');
          done();
        });
    });
  });
});
