import {Footer} from "../../components/footer";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import {Playlistsection} from "../../components/PlaylistSection";
import {SongList} from "../../components/SongList";

export const UserPage = () => {
    const params = useParams();

    const [user, setUser] = useState({
        email: "",
        username: "",
        image: "",
        _id: "",
        songs: [],
        playlists: []
    });

    useEffect(() => {
        axiosInstance.get(`/users/${params.id}/full`).then((res) => {
            setUser(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [params.id]);


    return <div className="bg-custom-section pt-28 md:pl-72 p-8">
        <div className="h-[300px] overflow-hidden"
             style={{backgroundImage: `url(${user.image})`, backgroundSize: "100%"}}>
            <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                <img src={user.image} alt="profile" className="h-40 w-40 rounded-full"/>
                <h1 className="text-5xl font-bold m-5">{user.username}</h1>
            </div>
        </div>
        <SongList songs={user.songs} author={user.username}/>
        <Playlistsection className={"mx-5 my-3"} playlists={user.playlists} title="Playlists"/>
        <Footer/>
    </div>
}