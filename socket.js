const socketio = require('socket.io');

module.exports = server => {
    const io = socketio(server);

    io.on('connection', socket => {
        console.log('New connection', socket.id);

        socket.on('joinList', list => {
            socket.join(list);
        });
        socket.on('sendItem', list => {
            console.log('Incoming change on list: ', list, socket.id);
            socket.broadcast.to(list).emit('change', list);
        });
        socket.on('disconnect', () => {
            console.log('User has left!');
        });
    });
};
