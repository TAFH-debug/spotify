import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
    name: string,
    playlistId: string
    artistId: string,
    s3ref: string,
    image: string
}

const SongSchema: Schema = new Schema({
    name: { type: String, required: true },
    artistId: { type: mongoose.Schema.ObjectId, required: true },
    s3ref: { type: String, required: true },
    playlistId: { type: mongoose.Schema.ObjectId, required: true },
    image: { type: String, required: true, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }
});

const Song = mongoose.model<ISong>('Song', SongSchema);

export default Song;