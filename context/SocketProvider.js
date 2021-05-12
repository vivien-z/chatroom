import React, { useContext, useEffect, useState } from 'react'

import { io } from "socket.io-client";

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}


export function SocketProvider( username, children ) {
  if (!res.socket.server.io) {
    console.log("First use, starting socket.io");
    const io = new Server(res.socket.server);
    io.on("connection", (socket) => {
      const username = socket.handshake.query.username
      socket.join(username)
      socket.on("message-submitted", ({ selectedChatroom, messageContent, senderUsername }) => {
        socket.emit("message-new", {selectedChatroom, messageContent, senderUsername})
        socket.broadcast.emit("message-new", {selectedChatroom, messageContent, senderUsername})
      })
    });
    res.socket.server.io = io;
  } else {
    console.log("Server already started");
  }

  const value = {
    socket
  }

  return (
    <SocketContext.Provider value={value}>

    </SocketContext.Provider>
  )
}

// const ioHandler = (req, res) => {
//   // if the socket server hasn't started yet, start it up.
//   if (!res.socket.server.io) {
//     console.log("First use, starting socket.io");

//     // create the websocket server
//     const io = new Server(res.socket.server);

//     io.on("connection", (socket) => {

//       // when a message is submitted, broadcast it.
//       socket.on("message-submitted", (msg) => {
//         // echo the message back to the user
//         socket.emit("message", msg);
//         // broadcast the message to everyone else
//         socket.broadcast.emit("message", msg);
//       });

//       socket.on("chatroom-created", (chatrm) => {
//         socket.emit("chatroom", chatrm);
//         socket.broadcast.emit("chatroom", chatrm);
//       });

//       socket.on("user-created", (user) => {
//         socket.emit("user", user);
//         socket.broadcast.emit("user", user);
//       });

//     });

//     // make the socket available externally.
//     res.socket.server.io = io;
//   } else {
//     // don't do anything if the server was already started.
//     console.log("Server already started");
//   }

//   // send back an empty 200
//   res.end();
// };

// export default ioHandler;
