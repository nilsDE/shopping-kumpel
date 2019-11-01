module.exports = class ApplicationPolicy {
  
  constructor(user) {
    this.user = user;
  }

  isAllowed() {
    if(this.user === null || this.user === undefined) {
      return false
    } else {
      return true
    }
  };
};