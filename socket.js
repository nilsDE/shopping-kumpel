const socketio = require('socket.io');

module.exports = server => {
    const io = socketio(server);

    io.on('connection', socket => {
        console.log('New connection', socket.id);
        let currentRoom = null;

        socket.on('joinList', list => {
            if (currentRoom !== null) {
                socket.leave(currentRoom);
            }
            socket.join(list);
            currentRoom = list;
            console.log(currentRoom);
        });
        socket.on('sendItem', list => {
            console.log('Incoming change on list: ', list, socket.id);
            socket.broadcast.to(list).emit('change', list);
        });
        socket.on('leaveList', list => {
            socket.leave(list);
        });
        socket.on('disconnect', () => {
            console.log('User has left!');
        });
    });
};
