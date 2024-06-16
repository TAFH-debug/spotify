import PlaylistService  from "./playlist-service";
import PlaylistController from "./playlist-controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";

const playlistService = new PlaylistService();
const playlistController = new PlaylistController(playlistService);
const router = Router();

router.post('/playlist', authMiddleware, playlistController.createPlaylist);
router.get('/playlist/search', playlistController.searchPlaylists);
router.get('/playlist', authMiddleware, playlistController.getPlaylists);
router.get('/playlist/all', playlistController.getAllPlaylists);
router.get('/playlist/user/:id', playlistController.getPlaylistsByUserId);
router.get('/playlist/:id', playlistController.getPlaylistById);
router.get('/playlist/:id/full', playlistController.getPlaylistByIdFull);
router.put('/playlist/:id', authMiddleware, playlistController.updatePlaylist);
router.delete('/playlist/:id', authMiddleware, playlistController.deletePlaylist);
router.post('/playlist/add_song', authMiddleware, playlistController.addSongToPlaylist);
router.get('/playlist/:id/favorite', authMiddleware, playlistController.addFavoritePlaylist);

export default router;