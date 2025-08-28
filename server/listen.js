// listen.js — starts the HTTP server listening on a given port
module.exports = function listen(server, port = 3000) {
  server.listen(port, () => {
    console.log(`Socket server listening on http://localhost:${port}`);
  });
};
