import express, { Express, NextFunction } from "express";
import { userRouter } from "./src/routes/userRoutes";
import { connectDB } from "./src/db/connection";
import cors from "cors";
import bodyParser from "body-parser";
import { Server } from "socket.io";
import http from "http";
import { GLOBAL_VAR } from "./src/utils";
import helmet from "helmet";
import { AuthorisedSocket, Message } from "./src/types/types";
import {addFriendSocket,authorizeSocket,getFriendList,handleDirectMessage,handleDisconnect,initializeUser} from "./src/service/socketService";
import { redisClient } from "./src/db/redis";

const app: Express = express();

const httpServer = http.createServer(app);
 
async function startServer() {
  await connectDB();
  httpServer.listen(GLOBAL_VAR?.PORT || 4000, () => {
    console.log("app started on port", GLOBAL_VAR?.PORT);
  });

  app.use(helmet());
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(bodyParser.json());

  app.use("/api/v1/auth", userRouter);

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(authorizeSocket);

  io.on("connect", async (socket: AuthorisedSocket) => {
    initializeUser(socket);
    socket.on('get_friendList',async () => {
        await getFriendList(socket)
    })
    socket.on("add_friend", (friendName: string, cb: any) => {
      addFriendSocket(socket, friendName, cb);
    });


    // socket.on('offline',async(username : string) => {
    //   console.log('offline event occured!!!')
    //   if(socket.user){
    //    const friendList =  await redisClient.hgetall(`${socket.user.username}:friendList`)
    //    // @ts-ignore
    //    const jsonParsedFriendList = friendList.map((f) => JSON.parse(f))
    //    const updateList = jsonParsedFriendList.map((f : any) => {
    //     if(f.username === username) f.connected = false
    //    })
    //    console.log("updated List is ",updateList)

    //   }
    // })
    // socket.on('online',async(username : string) => {
    //   console.log('online event occured!!!')
    //   if(socket.user) {
    //     await redisClient.hset(`${socket.user.username}:friendList`, {
    //       username,
    //       connected : true
    //     })
    //   }
    // })
    socket.on("direct_message", (messageDetails: string) =>
      handleDirectMessage(socket, messageDetails)
    );

    socket.on('disconnecting' , async () => {
      handleDisconnect(socket)
  })
  });
}
console.clear();
startServer();
   

/*

socket connect
auth chek -> to check if socket has valid userId, and is prsent in db.
map userID with SocketID,(so that one user cannot have mulitple socket ids) {username : '' , connected : true} 
propagate socket status {connected : } to its friendList(if not empty)!!


Add Friend Feature (save, friendlist of a user(socket) in redis(can be list[username : string]) and friendList can be saved in MongoDB too)
Direct Messsage Feature(Working fine....)


socket Disconnect
propagate socket status {connected : } to its friendList(if not empty)!!

*/