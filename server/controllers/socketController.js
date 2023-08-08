const redisClient = require("../redis");

const authorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    next(new Error("Not authorized"));
  }
  socket.user = { ...socket.request.session.user };
  redisClient.hset(`userid:${socket.user.email}`, "userid", socket.user.userid);
  next();
};

module.exports = authorizeUser;
