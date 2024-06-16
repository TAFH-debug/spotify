import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {Footer} from "../../components/footer";
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import {SongList} from "../../components/SongList";

export const PlaylistPage = () => {
    const params = useParams();
    const [showSidebar, setShowSidebar] = useState(true);

    const [playlist, setPlaylist] = useState({
        name: "",
        description: "",
        image: "",
        songs: [],
    });

    useEffect(() => {
        axiosInstance.get(`/playlist/${params.id}/full`).then((res) => {
            setPlaylist(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [params.id]);

    return <div className="min-h-screen text-gray-300">
        <Header setShowSidebar={setShowSidebar}/>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
        <div className="bg-custom-section pt-28 md:pl-72 p-8">
            <div className="h-[300px] overflow-hidden"
                 style={{backgroundImage: `url(${playlist.image})`, backgroundSize: "100%"}}>
                <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
                    <img src={playlist.image} alt="profile" className="h-40 w-40 rounded-full"/>
                    <h1 className="text-5xl font-bold m-5">{playlist.name}</h1>
                </div>
            </div>
            <SongList songs={playlist.songs} author={playlist.name} />
            <Footer/>
        </div>
        <ToastContainer/>
    </div>
}