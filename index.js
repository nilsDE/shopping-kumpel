const express = require('express');
require('dotenv').config();
const path = require('path');
const socketio = require('socket.io');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const itemController = require('./controllers/itemController');
const listController = require('./controllers/listController');
const collabController = require('./controllers/collabController');
const userController = require('./controllers/userController');

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
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`);
});

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
// app.post('/users/signin', userController.signIn);
// app.post('/users/signout', userController.signOut);

app.post('/create', itemController.create);
app.post('/complete', itemController.update);
app.post('/delete', itemController.delete);
app.put('/update', itemController.update);

app.post('/list/create', listController.create);
app.get('/list/index', listController.index);
app.delete('/list/delete', listController.delete);

app.get('/collab/index', collabController.index);
app.post('/collab/create', collabController.create);
app.delete('/collab/delete', collabController.delete);

app.use(express.static(path.join(__dirname, 'client/build')));
