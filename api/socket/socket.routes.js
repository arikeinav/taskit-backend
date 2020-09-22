
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        console.log('socket connection on');

        socket.on('connect to board', boardId => {
            if (socket.myBoard) {
                socket.leave(socket.myBoard)
            }
            socket.join(boardId)
            socket.myBoard = boardId;
            console.log('connect to board');
        })
        
        socket.on('update board', board => {
            console.log('update board');
            // io.emit('update board', board)

            // emits only to sockets in the same room
            io.to(socket.myBoard).emit('send updated board', board)
        })
    })
}