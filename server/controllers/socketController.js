const redisClient = require("../redis");

const authorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    next(new Error("Not authorized"));
  }
  socket.user = { ...socket.request.session.user };
  redisClient.hset(`userid:${socket.user.name}`, "userid", socket.user.userid);
  next();
};

const addFriend = async (friendName, cb) => {
  const friendUserID = await redisClient.hget(`userid:${friendName}`, "userid");
  cb({ done: false, errorMsg: "No users found" });
  console.log(friendUserID);
};

module.exports = { authorizeUser, addFriend };
