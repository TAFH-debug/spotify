import 'dotenv/config';
import express from 'express';
import connectDB from './db';
import globalRouter from './global-router';
import { logger } from './logger';
import cors from 'cors';
import {createServer} from "node:http";
import {Server} from "socket.io";
import {Chat} from "./websockets/websocket";

const app = express();
const PORT = 3000;

connectDB();

app.use(cors({ origin: '*' }));
app.use(logger);
app.use(express.json());
app.use('/', globalRouter);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const sock = new Chat(io);


server.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
