import {Footer} from "../../components/footer";
import React, {useEffect, useState} from "react";
import {Playlistsection} from "../../components/PlaylistSection";
import {SongList} from "../../components/SongList";
import axiosInstance from "../../axios/axiosInstance";

export const Favorites = () => {
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        axiosInstance.get("/me/full").then((res) => {
            console.log(res.data);
            setPlaylists(res.data.favoritePlaylists);
            setSongs(res.data.favoriteSongs);
        }).catch((err) => {
            console.log(err);
        });
    });

    return (
        <div className="bg-custom-section pt-28 md:pl-72 p-8 min-h-screen">
            <div className="w-full">
                <Playlistsection playlists={playlists} title={"Favorite playlists"}/>
                <SongList songs={songs} />
            </div>
            <Footer/>
        </div>
    )
}