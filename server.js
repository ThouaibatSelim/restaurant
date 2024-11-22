const http = require('http');
// const app = require("./app.js");
const app = require("./app.js");

//Port 3005
const numPort = 3005;
app.set("port", numPort);

//
const server = http.createServer(app);

server.listen(numPort, () => {
    console.log(`Le serveur est activé au port : ${numPort}`);
  });
  