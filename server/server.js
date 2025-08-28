// server.js — main wiring file
// - Creates Express app + HTTP server
// - Creates Socket.IO server with CORS allowed for Angular at :4200 (per workshop notes)
// - Plugs in our sockets handlers module
// - Starts listening on port 3000 via separate 'listen' module

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Basic Express app
const app = express();

// Allow basic CORS for any potential REST; Socket.IO CORS is configured separately below
app.use(cors());

// Create an HTTP server for Socket.IO to attach to
const httpServer = http.createServer(app);

// Create Socket.IO server with explicit CORS
// Only allow the Angular dev server origin and standard methods.
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4200', // Server origin
    methods: ['GET', 'POST'],
  },
});

// Attach socket event handlers defined in a separate module
require('./sockets')(io);

// Start listening on port 3000 using a dedicated module
require('./listen')(httpServer, 3000);
