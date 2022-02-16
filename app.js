const express = require("express");
const app = express();
const http = require("http");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const socket = require("socket.io");

const io = socket(server);
require("./utils/socket")(io);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("index");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
app.post("/room", (req, res) => {
  roomname = req.body.roomname;
  username = req.body.username;
  res.redirect(`/room?username=${username}&roomname=${roomname}`);
});

//Rooms
app.get("/room", (req, res) => {
  res.render("room");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
