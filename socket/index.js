import { Server } from 'socket.io';

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000"
  }
});

let users = [];

const addUser = (userData, socketId) => {
  const existingUser = users.find(user => user.sub === userData.sub);
  if (!existingUser) {
    users.push({ ...userData, socketId });
  } else {
    existingUser.socketId = socketId;
  }
};

const getUser = (userId) => {
  return users.find(user => user.sub === userId);
};

const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
};

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on("addUsers", userData => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  socket.on('sendMessage', data => {
    const user = getUser(data.receiverId);
    if (user) {
      io.to(user.socketId).emit('getMessage', data);
    }
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});