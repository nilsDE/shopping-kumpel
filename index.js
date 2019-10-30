const express = require('express');
require('dotenv').config();
const path = require('path');
const itemController = require('./controllers/itemController');
const userController = require('./controllers/userController');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passportConfig = require("./config/passport-config");
const session = require("express-session");

// General setup
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.cookieSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1.21e+9 }
}));
passportConfig.init(app);
app.use((req,res,next) => {
  res.locals.currentUser = req.user;
  next();
})

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})

// Routes
app.post("/users", userController.create);
app.post("/users/signin", userController.signIn);
app.post("/users/signout", userController.signOut);
app.post("/create", itemController.create);
app.post("/complete", itemController.update);
app.post("/delete", itemController.delete);
app.post("/update", itemController.update);
app.get("/items", itemController.index);

app.get("/users/verify", (req, res) => {
  const loggedIn = req.user ? true : false;
  res.json({ msg: loggedIn });
});

app.use(express.static(path.join(__dirname, 'client/build')))
