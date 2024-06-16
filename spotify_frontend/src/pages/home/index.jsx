import React, {useEffect, useState} from "react";
import { Artistsection } from "../../components/Artistsection";
import { Playlistsection } from "../../components/PlaylistSection";
import "./Home.css";
import axiosInstance from "../../axios/axiosInstance";
import {Modal} from "../../components/Modal";


export const Home = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/playlist/all")
            .then((res) => {
                setPlaylists(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axiosInstance
            .get("/users/artists")
            .then((res) => {
                setArtists(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={"bg-custom-section pt-28 p-8 md:pl-72"}>
            <Artistsection artists={artists}></Artistsection>
            <Playlistsection playlists={playlists} title={"Top charts"}></Playlistsection>
            <Playlistsection playlists={playlists} title={"Your favorite artists"}></Playlistsection>
        </div>
    );

};
