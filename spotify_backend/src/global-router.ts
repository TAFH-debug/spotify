import { Router } from 'express';
import authRouter from './auth/auth-router';
import userRouter from './users/user-router';
import songRouter from "./songs/song-router";
import playlistRouter from "./playlists/playlist-router";
import s3Router from "./s3/s3-router";

const globalRouter = Router();

globalRouter.use(songRouter);
globalRouter.use(authRouter);
globalRouter.use(userRouter);
globalRouter.use(playlistRouter);
globalRouter.use(s3Router);

export default globalRouter;
