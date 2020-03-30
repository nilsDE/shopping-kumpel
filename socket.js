const socketio = require('socket.io');

module.exports = server => {
    const io = socketio(server);

    io.on('connection', socket => {
        console.log('New connection', socket.id);

        socket.on('sendItem', listId => {
            console.log(listId);
            socket.broadcast.emit('change');
        });

        socket.on('disconnect', () => {
            console.log('User has left!');
        });
    });
};
