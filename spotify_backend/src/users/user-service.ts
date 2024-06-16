import { IUser } from '../auth/models/User';
import UserModel from '../auth/models/User';
import dotenv from 'dotenv';

dotenv.config();

class UserService {
    async getUsers(): Promise<IUser[]> {
        return await UserModel.find().exec();
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await UserModel.findById(id).exec();
    }

    async getUserByIdFull(id: string): Promise<IUser | null> {
        return await UserModel.findById(id).populate('songs').populate("playlists").exec();
    }

    async getArtists(): Promise<IUser[]> {
        return await UserModel.find({ songs: { $exists: true, $not: { $size: 0 } } }).exec();
    }

    async updateUser(id: string, user: IUser): Promise<IUser | null> {
        return await UserModel.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<IUser | null> {
        return await UserModel.findByIdAndDelete(id).exec();
    }
}

export default UserService;