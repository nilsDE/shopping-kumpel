const socketio = require('socket.io');

module.exports = server => {
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
};
