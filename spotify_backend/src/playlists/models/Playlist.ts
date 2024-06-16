import mongoose, { Document, Schema } from 'mongoose';

export interface IPlaylist extends Document {
    name: string,
    userId: string,
    description: string,
    image: string
}

const PlaylistSchema: Schema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true, default: "" },
    userId: { type: mongoose.Schema.ObjectId, required: true },
    songs: [{ type: mongoose.Schema.ObjectId, ref: "Song" }],
    description: { type: String, required: true }
});

export default mongoose.model<IPlaylist>('Playlist', PlaylistSchema);
