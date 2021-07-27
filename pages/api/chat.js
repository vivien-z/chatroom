// // This endpoint doesn't really do anything. It just starts websockets.
// // NextJS does not officially support websockets. NextJS is intended for deployment
// // to serverless environments, which are mostly incompatible with websockets.
// // This application will have to be deployed to Heroku or a similar non-serverless
// // environment.
// // This solution is by rogeriojlle on StackOverflow:
// // https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes/62547135#62547135


import { Server } from "socket.io";

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("First use, starting socket.io");

    // create the websocket server
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.broadcast.emit('a user connected')

      socket.on("user-submitted", ({id, username}) => {
        console.log("socket chat-io")
        // socket.emit("new-user-created", {id, username});
        socket.broadcast.emit("new-user-created", {id, username})
      });

      socket.on("message-submitted", ({ selectedChatroom, messageContent, senderUsername }) => {
        // socket.emit("new-message-created", {selectedChatroom, messageContent, senderUsername})
        socket.broadcast.emit("new-message-created", {selectedChatroom, messageContent, senderUsername})
      })

      // socket.on("create-chatroom", ({roomname, roomUserIds}) => {
      //   socket.emit("new-chatroom-created", {roomname, roomUserIds});
      //   socket.broadcast.emit("new-chatroom-created", {roomname, roomUserIds});
      // });


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



// const io = require('socket.io')(5000)

// io.on("connection", (socket) => {
//   const username = socket.handshake.query.username
//   socket.join(username)

//   // socket.on('send-message', ({ selectedChatroom, messageContent }) => {
//   //   selectedChatroom.roomUsers.forEach(roomUser => {
//   //     const adjRoomUsers = selectedChatroom.roomUsers.filter(u => u !== roomUser)
//   //     adjRoomUsers.push(username)
//   //     socket.broadcast.to(roomUser).emit('recieve-message', {
//   //       roomUsers: adjRoomUsers, senderName: username, messageContent
//   //     })
//   //   })
//   // })

//   // socket.on('send-message', ({selectedChatroom, chatroomMessages}) => {
// socket.on("message-submitted", ({selectedChatroom, messageContent, senderUsername}) => {
//   const recipients = selectedChatroom.roomUsers.filter(user => user.username !== senderUsername)
//   recipients.forEach(r => {
//     socket.broadcast.to(r).emit("message-new", {
//       selectedChatroom, messageContent, senderUsername, recipients: recipients
//     })
//   })
// })
// })
