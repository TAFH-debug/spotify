import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  isOnline: boolean;
  lastActivity: Date;
  lastSongId: string;
  playlists: number[];
  songs: string[];
  image: string;
  favoriteSongs: string[];
  favoritePlaylists: string[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, default: "Default" },
  password: { type: String, required: true },
  isOnline: { type: Boolean, default: false, required: true },
  lastActivity: { type: Date, default: new Date(), required: true },
  lastSongId: { type: Schema.Types.ObjectId, ref: "Song" },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
  favoriteSongs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  favoritePlaylists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
  image: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }
});

export default mongoose.model<IUser>('User', UserSchema);
