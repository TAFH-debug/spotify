import SongModel, {ISong} from "../songs/models/Song";
import {CreateSongDto} from "./dtos/CreateSong.dot";
import PlaylistModel from "../playlists/models/Playlist";
import UserModel from "../auth/models/User";

class SongService {

    async addFavoriteSong(userId: string, songId: string): Promise<void> {
        await UserModel.findByIdAndUpdate(userId, { $addToSet: { favoriteSongs: songId } }).exec();
    }

    async getSongByIdFull(id: string): Promise<ISong | null> {
        return await SongModel.findById(id).populate('artistId').populate('playlistId').exec();
    }

    async getSongById(id: string): Promise<ISong | null> {
        return await SongModel.findById(id).exec();
    }

    async searchSongs(search: string): Promise<ISong[]> {
        return await SongModel.find({name: new RegExp(search, 'i')}).exec();
    }

    async getSongs(): Promise<ISong[]> {
        return await SongModel.find()
            .exec();
    }

    async deleteSong(id: string): Promise<ISong | null> {
        return await SongModel.findByIdAndDelete(id).exec();
    }

    async updateSong(id: string, updateSongDto: CreateSongDto): Promise<ISong | null> {
        const { name, s3ref, playlistId } = updateSongDto;

        return await SongModel.findByIdAndUpdate(id, {
            name,
            s3ref,
            playlistId
        }, {new: true}).exec();
    }

    async createSong(createSongDto: CreateSongDto, artistId: string): Promise<ISong> {
        const { name, s3ref, playlistId, image } = createSongDto;
        const newSong = new SongModel({
            name,
            artistId,
            s3ref,
            image,
            playlistId
        });
        await newSong.save();

        await UserModel.findOneAndUpdate({ _id: artistId }, { $push: { songs: newSong.id } }).exec();
        await PlaylistModel.findOneAndUpdate({ _id: playlistId }, { $push: { songs: newSong.id } }).exec();
        return newSong;
    }
}

export default SongService;