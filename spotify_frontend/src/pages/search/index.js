import {Footer} from "../../components/footer";
import React, {useState} from "react";
import axiosInstance from "../../axios/axiosInstance";
import {PlaylistsCard} from "../../components/PlaylistCard";
import {SongCard} from "../../components/SongList";

export const Search = () => {
    const [search, setSearch] = useState("");
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);

    const procSearch = () => {
        axiosInstance.get(`/playlist/search?search=${search}`).then((res) => {
            setPlaylists(res.data);
        }).catch((err) => {
            console.log(err);
        });
        axiosInstance.get(`/songs/search?search=${search}`).then((res) => {
            setSongs(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="bg-custom-section pt-28 md:pl-72 p-8">
            <div className="flex w-full items-center flex-col min-h-[400px]">
                <span className="font-bold text-3xl m-2">Search</span>
                <div>
                    <input value={search}
                           onChange={(e) => setSearch(e.target.value)}
                           className="border-white border-2 focus:outline-none p-4 rounded-lg bg-black text-white"
                    />
                    <button className="rounded-lg p-3 bg-green-500 font-bold m-3" onClick={procSearch}>Search</button>
                </div>
                <div className="flex flex-wrap">
                    {
                        playlists.map((playlist) => <PlaylistsCard title={playlist.name} description={playlist.description} imageUrl={playlist.image} id={playlist._id}/>)
                    }
                </div>
                <div className="w-full">
                    {
                        songs.map((song) => <SongCard song={song} author={song.artist} index=""/>)
                    }
                </div>
            </div>
            <Footer/>
        </div>
    );
}