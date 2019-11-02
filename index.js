const express = require('express');
require('dotenv').config();
const path = require('path');
const socketio = require('socket.io');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const itemController = require('./controllers/itemController');
const userController = require('./controllers/userController');
const passportConfig = require('./config/passport-config');

// General setup
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.cookieSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1.21e9 }
  })
);
passportConfig.init(app);
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});

// Mock Auth
if (process.env.NODE_ENV === 'test') {
  const mockAuth = require('./spec/support/mock-auth.js');
  mockAuth.fakeIt(app);
}

// socket.io
const io = socketio(server);

io.on('connection', socket => {
  socket.on('item', (item, callback) => {
    io.emit('item', { text: item });
    callback();
  });

  socket.on('sendItem', () => {
    socket.broadcast.emit('change');
  });

  socket.on('disconnect', () => {
    console.log('User has left!');
  });
});

// Routes
app.post('/users', userController.create);
app.post('/users/signin', userController.signIn);
app.post('/users/signout', userController.signOut);
app.post('/create', itemController.create);
app.post('/complete', itemController.update);
app.post('/delete', itemController.delete);
app.post('/update', itemController.update);
app.get('/items', itemController.index);

app.get('/users/verify', (req, res) => {
  const loggedIn = req.user ? true : false;
  res.json({ msg: loggedIn });
});

app.use(express.static(path.join(__dirname, 'client/build')));
