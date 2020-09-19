const socketio = require('socket.io');

module.exports = (server) => {
    const io = socketio(server);

    io.on('connection', (socket) => {
        console.log('Socket -- new connection', socket.id);
        let currentRoom = null;

        socket.on('joinList', (list) => {
            console.log('Socket -- joinList:', list);
            if (currentRoom !== null) {
                socket.leave(currentRoom);
            }
            socket.join(list);
            currentRoom = list;
            console.log(currentRoom);
        });
        socket.on('sendItem', (list, userId) => {
            console.log('Socket -- send item: ', list, userId);
            socket.broadcast.to(list).emit('change', list, userId);
        });
        socket.on('leaveList', (list) => {
            console.log('Socket -- leaveList: ', list);
            socket.leave(list);
        });
        socket.on('disconnect', () => {
            console.log('User has left!');
        });
    });
};
