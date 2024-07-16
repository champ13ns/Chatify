import express, { Express } from "express";
import { userRouter } from "./src/routes/userRoutes";
import { connectDB } from "./src/db/connection";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import { Server } from "socket.io";

const app: Express = express();
const io = new Server()

async function startServer() {
  app.listen(4000, () => {
    console.log("app started on port", 4000);
  });

  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.json());

  await connectDB();
  app.use("/api/v1/auth", userRouter);
}

startServer();
