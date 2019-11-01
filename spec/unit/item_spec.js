const sequelize = require("../../db/models/index").sequelize;
const Item = require("../../db/models").Item;
const User = require("../../db/models").User;


   beforeEach((done) => {
     this.item;
     this.user;
     sequelize.sync({force: true}).then(res => {
       User.create({
         email: "starman@tesla.com",
         password: "Trekkie4lyfe",
         name: 'Mr X'
       })
       .then((user) => {
         this.user = user;
         Item.create({
           description: "Honey",
           completed: false
         })
         .then(item => {
           this.item = item;
           done();
         });
       });
     });
   });