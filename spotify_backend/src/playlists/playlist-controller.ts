import { Request, Response } from 'express';
import PlaylistService from './playlist-service';
import { CreatePlaylistDto } from './dtos/CreatePlaylist.dto';

class PlaylistController {
    private playlistService: PlaylistService;

    constructor(playlistService: PlaylistService) {
        this.playlistService = playlistService;
    }

    addFavoritePlaylist = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            if (req.user === undefined) {
                res.status(500).json({message: 'No user found.'});
                return;
            }
            await this.playlistService.addFavoritePlaylist((req as any).user.id, id);
            res.status(200).json({ message: 'Playlist added to favorites' });
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    searchPlaylists = async (req: Request, res: Response): Promise<void> => {
        try {
            const search = req.query.search;
            const playlists = await this.playlistService.searchPlaylists(typeof search === "string" ? search : '');
            res.status(200).json(playlists);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    createPlaylist = async (req: Request, res: Response): Promise<void> => {
        try {
            const createPlaylistDto: CreatePlaylistDto = req.body;
            const playlist = await this.playlistService.createPlaylist(createPlaylistDto);
            res.status(201).json(playlist);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    getAllPlaylists = async (req: Request, res: Response): Promise<void> => {
        try {
            const playlists = await this.playlistService.getAllPlaylists();
            res.status(200).json(playlists);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    getPlaylists = async (req: Request, res: Response): Promise<void> => {
        if (req.user === undefined) {
            res.status(500).json({message: 'No user found.'});
            return;
        }
        try {
            const playlists = await this.playlistService.getPlaylists((req as any).user.id);
            res.status(200).json(playlists);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    getPlaylistsByUserId = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const playlists = await this.playlistService.getPlaylists(id);
            res.status(200).json(playlists);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    getPlaylistById = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const playlist = await this.playlistService.getPlaylistById(id);
            if (!playlist) {
                res.status(404).json({message: 'Playlist not found'});
                return;
            }
            res.status(200).json(playlist);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    getPlaylistByIdFull = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const playlist = await this.playlistService.getPlaylistByIdFull(id);
            if (!playlist) {
                res.status(404).json({message: 'Playlist not found'});
                return;
            }
            res.status(200).json(playlist);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    updatePlaylist = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const createPlaylistDto: CreatePlaylistDto = req.body;
            const playlist = await this.playlistService.updatePlaylist(id, createPlaylistDto);
            if (!playlist) {
                res.status(404).json({message: 'Playlist not found'});
                return;
            }
            res.status(200).json(playlist);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    deletePlaylist = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const playlist = await this.playlistService.deletePlaylist(id);
            if (!playlist) {
                res.status(404).json({message: 'Playlist not found'});
                return;
            }
            res.status(200).json(playlist);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    addSongToPlaylist = async (req: Request, res: Response): Promise<void> => {
        try {
            const { playlistId, songId } = req.body;
            await this.playlistService.addSongToPlaylist(playlistId, songId);
            res.status(200).json({ message: 'Song added to playlist' });
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    }
}

export default PlaylistController;
