import { AuthorisedSocket, Message } from "../types/types";
import { UserRepo } from "../repository/userRepository";
import { redisClient } from "../db/redis";
import { GLOBAL_VAR } from "../utils";
import jwt from "jsonwebtoken";
import { messageModel } from "../db/model/messageModel";

async function addFriendSocket(socket: AuthorisedSocket,username: string,cb: any) {
if (socket.user?.username === username) {
  cb({ done: false, errorMessage: "Cannot add self!!" });
  return;
}

const user = await UserRepo.findUserByUserName(username);
if (!user) {
  cb({ done: false, errorMessage: "User doesn't exist!!" });
  return;
}
// @ts-ignore
let existingFriendList : [{username : string, name : string, connected : boolean}] = (await redisClient.lrange(`${socket.user.username}:friendList`,0,-1));
//@ts-ignore
for(let i=0;i<existingFriendList.length;i++)  {
  //@ts-ignore
  const jsonparsedList = JSON.parse(existingFriendList[i])
  if(jsonparsedList.username === username) {
    console.log('true');
    cb({done : false , errorMessage : 'Friend already added!'})
    return;
  }
}
const status1 = await redisClient.hget(`${socket.user?.username}:data`, "connected");
const status2 = await redisClient.hget(`${socket.user?.username}:data`, "connected");
console.log("status 1 and status 2", status1, status2)
// @ts-ignore
await redisClient.lpush(`${socket.user.username}:friendList`, JSON.stringify({ username: user.username,  name: user.firstName + " " + user.lastName }));
if(socket.user?.firstName)
// second friend added in friend List
await redisClient.lpush(`${username}:friendList`, JSON.stringify({ username: socket.user.username,  name: socket.user?.firstName + " " + socket?.user?.lastName }));
// await user.friendList.push({username: user.username, connected: status[0], name: user.firstName + " " + user.lastName })
// await user.save();
// @ts-ignore
const data = await redisClient.lrange(`${socket.user.username}:friendList`, 0, -1);
const parsedData = data.map(item => JSON.parse(item));
cb({ done: true, data: parsedData });
}

async function initializeUser(socket: AuthorisedSocket) {
  if (socket.user && socket.user.username) {
    socket.join(socket.user.username);

    const existingUserData = await redisClient.hgetall(
      `${socket.user.username}:data`
    );

    if (Object.keys(existingUserData).length === 0) {
  await redisClient.hset(`${socket.user.username}:data`, {
    username: socket.user.username,
    socketId: socket.id,
    connected: true,
  });
} else {
  await redisClient.hset(`${socket.user.username}:data`, {
    username: socket.user.username,
    connected: true,
    socketId: socket.id,
  });
}

    const existingFriendList = await redisClient.lrange(
      `${socket.user.username}:friendList`,
      0,
      -1
    );
    if(existingFriendList.length > 0){
      const jsonList = existingFriendList.map((f) => JSON.parse(f).username)
      for(let friend of jsonList) {
        socket.emit("getStatus")

      }
      socket.on('online',username => {

      })
      // socket init -> 
      // socket.to(jsonList).emit('friends',true,existingFriendList)
      // socket.to(jsonList).emit('online',socket.user.username) // event to set status of curretn socket offline in it's friendlists.
      // socket.to(jsonList).emit('online',socket.user.username)
    }
  }
}
// friendList -> 

async function handleDisconnect(socket: AuthorisedSocket) {
  console.log('socket disconnected ',socket.id)
  if (socket.user && socket.user.username) {
    await redisClient.hset(`${socket.user.username}:data`,"connected","false");

    const existingFriendList = await redisClient.lrange(`${socket.user.username}:friendList`,0,-1);

    const parsedFriendList = existingFriendList.map((f) => JSON.parse(f).username) 
    console.log("disconnecte ",parsedFriendList)
      socket.to(parsedFriendList).emit("connected", false, socket.user.username);
  }
}

async function updateFriendList(socket : AuthorisedSocket, username : string, status : boolean) {
  if(socket?.user && socket?.user.username){
  const stringyfiedList =  await redisClient.hget(`${socket.user?.username}:friendList`,"username")
  //@ts-ignore
  const jsonParsedList = stringyfiedList.map(f => JSON.parse(f))
  for(let i=0;i<jsonParsedList.length;i++) {
    if(jsonParsedList[i].username === username) jsonParsedList[i].status = status
  }
  await redisClient.hset(`${socket.user.username}:friendList`, JSON.stringify(jsonParsedList))
  }
}

async function authorizeSocket(socket: AuthorisedSocket, next: any) {
  try {
    const token: string =
      socket.request.headers.authorization?.split(" ")[1] || "";
    if (!token) {
      return next(new Error("Not authorised"));
    }
    const user = jwt.verify(token, GLOBAL_VAR.JWT_SECRET || "");
    if (!user) return next(new Error("Invalid user"));
    //@ts-ignore
    (socket as AuthorisedSocket).user = user;
    console.log("user is ",socket.user)
    console.log("socket id ",socket.id)
    next();
  } catch (error: any) {
    console.log(error);
    next(new Error(error.message || "Error while authenticating WS"));
  }
}

async function handleDirectMessage(socket: AuthorisedSocket, message: string) {
  const parsedMessage: Message = JSON.parse(message);
  if (socket.user?.username !== socket.user?.username)
    throw new Error("Bad Request");
  const senderId = parsedMessage.senderId;
  const recieverId = parsedMessage.recieverId;
  console.log(senderId, recieverId);
  if (!senderId || !recieverId) {
    throw new Error("Bad Request");
  }
  const existingMessage = await messageModel.findOne({
    $and: [{ senderId }, { recieverId }],
  });

  console.log("Existing messages are ", existingMessage);

  if (!existingMessage || existingMessage === null) {
    const newMessage = await messageModel.create({
      senderId,
      recieverId,
      messageContent: [
        { message: parsedMessage.messageContent, time: Date.now().toString() },
      ],
    });
  } else {
    await existingMessage.messageContent.unshift({
      message: parsedMessage.messageContent,
      time: Date.now().toString(),
    });
    const message = await existingMessage.save();
    console.log(message);
  }
}

async function getFriendList(socket : AuthorisedSocket) {
  const friendList = await redisClient.hgetall(`${socket.user?.username}:friendList`);
  const jsonParsedList = friendList.map(f => JSON.parse(f).username)
}

export {
  addFriendSocket,
  authorizeSocket,
  initializeUser,
  handleDirectMessage,
  handleDisconnect,
  getFriendList
};
