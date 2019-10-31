const sequelize = require('../../db/models/index').sequelize;
const Item = require('../../db/models').Item;
const User = require('../../db/models').User;

describe("Item", () => {
  beforeEach(done => {
    this.item;
    this.user;

    sequelize.sync({
      force: true
    }).then(res => {
      User.create({
        name: "Dr. Test",
        email: "test@aol.com",
        password: "123456"
      })
      .then(user => {
        this.user = user;
        Item.create({
          description: "Bread",
          completed: false
        })
        .then(item => {
          this.item = item;
          done();
        })
      })
    })
  })

  // describe("Get all items", () => {
  //   it("should return all items from the database", done => {
  //     this.item.getAllItems()
  //       .then(item => {
  //         expect(item.description).toBe("Bread");
  //         done();
  //       })
  //   })
  // })
})