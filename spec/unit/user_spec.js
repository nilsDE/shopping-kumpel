const sequelize = require("../../db/models/index").sequelize;
const User = require("../../db/models").User;

describe("User", () => {
  beforeEach(done => {
    sequelize.sync({
        force: true
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
  describe("create user", () => {
    it("should create a User object with a valid email, name and password", (done) => {
      User.create({
          email: "user@example.com",
          password: "1234567890",
          name: 'John'
        })
        .then(user => {
          expect(user.email).toBe("user@example.com");
          expect(user.id).toBe(1);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });
    it("should not create a user with an email already taken", (done) => {
      User.create({
          email: "user@example.com",
          password: "1234567890",
          name: "Jack"
        })
        .then(user => {
          User.create({
              email: "user@example.com",
              password: "nananananananananananananananana BATMAN!",
              name: "Jim"
            })
            .then((user) => {
              done();
            })
            .catch((err) => {
              expect(err.message).toContain("Validation error");
              done();
            });
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });
  });
});