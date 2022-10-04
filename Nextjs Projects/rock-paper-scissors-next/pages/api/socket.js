import { Server } from 'socket.io';

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      socket.on('rivals', (msg) => {
        socket.broadcast.emit('await-rivals-' + msg, msg);
      });
      socket.on('figth-creator', ({ id, option }) => {
        socket.broadcast.emit('figth-invited-' + id, option);
      });
      socket.on('figth-invited', ({ id, option }) => {
        socket.broadcast.emit('figth-creator-' + id, option);
      });
    });
  }
  res.end();
};
export const config = {
  api: {
    bodyParser: false
  }
};
export default SocketHandler;
