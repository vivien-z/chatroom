import { Server } from "socket.io";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("First use, starting socket.io");
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.broadcast.emit('a user connected')

      socket.on("message-submitted", ({ selectedChatroom, messageContent, sender }) => {
        socket.broadcast.emit("new-message-created", {selectedChatroom, messageContent, sender})
      })
      socket.on("user-submitted", ({id, username}) => {
        socket.broadcast.emit("new-user-created", {id, username})
      });
      socket.on("create-chatroom", ({roomname, roomUsers}) => {
        socket.broadcast.emit("new-chatroom-created", {roomname, roomUsers});
      });
    });

    // make the socket available externally.
    res.socket.server.io = io;
  } else {
    console.log("Server already started");
  }

  // send back an empty 200
  res.end();
};

export default ioHandler;
