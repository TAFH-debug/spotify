export interface CreateSongDto {
    name: string,
    s3ref: string,
    playlistId: string,
    image?: string
}