const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const morgan = require('morgan');
const itemController = require('./controllers/itemController');
const listController = require('./controllers/listController');
const collabController = require('./controllers/collabController');

// General setup
const app = express();

app.use(morgan('dev'));

app.use(express.json({ extended: false }));

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

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/lists', require('./routes/lists'));

// Routes
app.post('/create', itemController.create);
app.post('/complete', itemController.update);
app.post('/delete', itemController.delete);
app.put('/update', itemController.update);

app.post('/list/create', listController.create);
app.delete('/list/delete', listController.delete);

app.get('/collab/index', collabController.index);
app.post('/collab/create', collabController.create);
app.delete('/collab/delete', collabController.delete);

app.use(express.static(path.join(__dirname, 'client/build')));
