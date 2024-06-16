import { Router } from 'express';
import SongController from './song-controller';
import SongService from './song-service';
import {authMiddleware} from "../middlewares/auth-middleware";


const songRouter = Router();

const songService = new SongService();
const songController = new SongController(songService);

songRouter.get('/songs/', songController.getSongs);
songRouter.get('/songs/search', songController.searchSongs);
songRouter.post('/songs/', authMiddleware, songController.createSong);
songRouter.get('/songs/:id', songController.getSongById);
songRouter.get('/songs/:id/full', songController.getSongByIdFull);
songRouter.put('/songs/:id', authMiddleware, songController.updateSong);
songRouter.delete('/songs/:id', authMiddleware, songController.deleteSong);
songRouter.get('/songs/:id/favorite', authMiddleware, songController.addFavoriteSong);

export default songRouter;