const bcrypt = require("bcryptjs");

module.exports = {
  ensureAuthenticated(req, res, next) {
    if (!req.user) {
      return false;
    } else {
      return true;
    }
  },
  comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
  }
};