const express = require("express");
const app = express();
const server = require("http").Server(app);
app.set("view engine", "ejs");

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
  allow_discovery: true
});

app.use("/peerjs", peerServer);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("client", {
  });
});

app.get("/board", (req, res) => {
  res.render("board", {
  });
});

app.get("/talk", (req, res) => {
  res.render("talk", {
  });
});

server.listen(process.env.PORT || 9000);

// peerServer events 
peerServer.on('connection', (client) => {
  console.log(`connection ${client.getId()}`)
})
peerServer.on('message', (client, message) => {
  console.log(`message ${client.getId()}, ${message.src} ${message.dst} ${message.type} ${JSON.stringify(message.payload)}`)
})

peerServer.on('disconnect', (client) => {
  console.log(`disconnect ${client.getId()}`)
})

peerServer.on('error', (error) => {
  console.log(`error ${error.name}  ${error.message}`)
})