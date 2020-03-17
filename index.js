const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const morgan = require('morgan');

// General setup
const app = express();
app.use(morgan('dev'));
app.use(express.json({ extended: false }));

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
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/lists', require('./routes/lists'));

app.use(express.static(path.join(__dirname, 'client/build')));
