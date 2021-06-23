const User = require('../models/user.model');

// Called while joining a chat room
const joinRoom = (io, socket, data) => {
  console.log(data.username + ' is joining the '+ data.roomId + ' chat...');

  socket.join(data.roomId);

  socket.emit("message", {
    userId: data.username,
    username: data.username,
    text: `Welcome ${data.username}`,
  });

  //* Broadcast message to everyone except user that he has joined
  socket.broadcast.to(data.roomId).emit("message", {
    userId: data.username,
    username: data.username,
    text: `${data.username} has joined the chat`,
  });

};

//when somebody send text
const chat = (io, socket, data) => {
  io.to(data.roomId).emit("message", {
    userId: data.username,
    username: data.username,
    text: data.ans
  });
};

module.exports = {
  chat, joinRoom
};
