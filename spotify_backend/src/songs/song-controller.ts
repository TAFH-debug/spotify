import {CreateSongDto} from "./dtos/CreateSong.dot";
import { Request, Response } from 'express';
import SongService from "./song-service";

class SongController {
    private songService: SongService;

    constructor(songService: SongService) {
        this.songService = songService;
    }

    addFavoriteSong = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            if (req.user === undefined) {
                res.status(500).json({message: 'No user found.'});
                return;
            }
            await this.songService.addFavoriteSong((req as any).user.id, id);
            res.status(200).json({message: 'Song added to favorites'});
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    getSongByIdFull = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const song = await this.songService.getSongByIdFull(id);
            if (!song) {
                res.status(404).json({message: 'Song not found'});
                return;
            }
            res.status(200).json(song);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    searchSongs = async (req: Request, res: Response): Promise<void> => {
        try {
            const search = req.query.search;
            const songs = await this.songService.searchSongs(typeof search === "string" ? search : '');
            res.status(200).json(songs);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    createSong = async (req: Request, res: Response): Promise<void> => {
        try {
            const artistId = (req as any).user.id;
            const createSongDto: CreateSongDto = req.body;
            const song = await this.songService.createSong(createSongDto, artistId);
            res.status(201).json(song);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    getSongs = async (req: Request, res: Response): Promise<void> => {
        try {
            const songs = await this.songService.getSongs();
            res.status(200).json(songs);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    getSongById = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const song = await this.songService.getSongById(id);
            if (!song) {
                res.status(404).json({message: 'Song not found'});
                return;
            }
            res.status(200).json(song);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    updateSong = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const createSongDto: CreateSongDto = req.body;
            const song = await this.songService.updateSong(id, createSongDto);
            if (!song) {
                res.status(404).json({message: 'Song not found'});
                return;
            }
            res.status(200).json(song);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }

    deleteSong = async (req: Request, res: Response): Promise<void> => {
        try {
            const {id} = req.params;
            const song = await this.songService.deleteSong(id);
            if (!song) {
                res.status(404).json({message: 'Song not found'});
                return;
            }
            res.status(200).json(song);
        } catch (error: any) {
            res.status(500).send({error: error.message});
        }
    }
}

export default SongController;