// sockets.js — all Socket.IO event wiring lives here
// The module exports a function that receives the io instance created in server.js.

module.exports = function attachSocketHandlers(io) {
  // 'connection' fires for every new client
  io.on('connection', socket => {
    console.log(`Client connected: ${socket.id}`);

    // When a client emits 'chat:message', broadcast to ALL clients (including sender)
    socket.on('chat:message', text => {
      // Build a normalized message so clients can render time easily
      const message = {
        text: String(text || ''),
        time: new Date().toISOString(),
        id: socket.id, // optional: identify the sender
      };

      // Emit to everyone
      io.emit('chat:message', message);
    });
  });
};
