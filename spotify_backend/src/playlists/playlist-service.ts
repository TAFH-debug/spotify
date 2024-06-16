import PlaylistModel, {IPlaylist} from "./models/Playlist";
import {CreatePlaylistDto} from "./dtos/CreatePlaylist.dto";
import UserModel from "../auth/models/User";

class PlaylistService {

    async addFavoritePlaylist(userId: string, playlistId: string) {
        await UserModel
            .findByIdAndUpdate(userId, {$addToSet: {favoritePlaylists: playlistId}})
            .exec();
    }

    async searchPlaylists(search: string) {
        return await PlaylistModel
            .find({name: {$regex: search, $options: 'i'}})
            .exec();
    }

    async getPlaylistById(id: string) {
        return await PlaylistModel
            .findById(id)
            .exec();
    }

    async getPlaylistByIdFull(id: string) {
        return await PlaylistModel
            .findById(id)
            .populate('songs')
            .exec();
    }

    async getAllPlaylists() {
        return await PlaylistModel
            .find()
            .exec();
    }

    async getPlaylists(userId: string): Promise<IPlaylist[]> {
        return await PlaylistModel
            .find({userId})
            .exec();
    }

    async deletePlaylist(id: string) {
        return await PlaylistModel
            .findByIdAndDelete(id)
            .exec();
    }

    async updatePlaylist(id: string, updatePlaylistDto: CreatePlaylistDto) {
        const {name, userId, description, image} = updatePlaylistDto;

        return await PlaylistModel
            .findByIdAndUpdate(id, {
                name,
                userId,
                description,
                image
            }, {new: true})
            .exec();
    }

    async createPlaylist(createPlaylistDto: CreatePlaylistDto): Promise<IPlaylist> {
        const {name, userId, description, image } = createPlaylistDto;

        const newPlaylist = new PlaylistModel({
            name,
            userId,
            description,
            image,
            songs: []
        });

        await UserModel.findByIdAndUpdate(userId, {$push: {playlists: newPlaylist._id}}).exec();

        await newPlaylist.save();
        return newPlaylist;
    }

    async addSongToPlaylist(playlistId: string, songId: string) {
        await PlaylistModel
            .findOneAndUpdate({ _id: playlistId }, {$addToSet: {songs: songId}})
            .exec();
    }

    async removeSongFromPlaylist(playlistId: string, songId: string) {
        await PlaylistModel
            .findOneAndUpdate({ _id: playlistId }, {$pull: {songs: songId}})
            .exec();
    }
}

export default PlaylistService;
